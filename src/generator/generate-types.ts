import * as t from "io-ts-codegen";
import yaml from "js-yaml";
import fs from "fs";
import prettier from "prettier";

const unswitch = (o: any): any =>
  o === null
    ? null
    : o instanceof Array
    ? o.map(a => unswitch(a))
    : typeof o === "object"
    ? Object.entries(o)
        .map(([a, b]: [string, any]) =>
          a === "switch"
            ? {
                anyOf: b
                  .filter((i: any) => i.then !== undefined)
                  .map((i: any) => unswitch(i.then))
              }
            : { [a]: unswitch(b) }
        )
        .reduce((a, b) => ({ ...a, ...b }), {})
    : o;

const PathItemHack = (objName: string) => (o: any): any => ({
  ...o,
  definitions: {
    ...o.definitions,
    [objName]: {
      ...o.definitions[objName],
      properties: {
        ...o.definitions[objName].properties,
        ..."get|put|post|delete|options|head|patch|trace"
          .split("|")
          .map(i => ({
            [i]:
              o.definitions[objName].patternProperties[
                "^(get|put|post|delete|options|head|patch|trace)$"
              ]
          }))
          .reduce((a, b) => ({ ...a, ...b }), {})
      }
    }
  }
});

const ResponsesHack = (objName: string) => (o: any): any => ({
  ...o,
  definitions: {
    ...o.definitions,
    [objName]: {
      ...o.definitions[objName],
      properties: {
        ...o.definitions[objName].properties,
        ...new Array(501)
          .fill(null)
          .map((_, j) => ({
            [`${j < 500 ? 100 + j : "default"}`]: o.definitions[objName]
              .patternProperties["^[1-5](?:\\d{2}|XX)$"]
          }))
          .reduce((a, b) => ({ ...a, ...b }), {})
      }
    }
  }
});

const HTTPSecuritySchemeHack = (objName: string) => (o: any): any => ({
  ...o,
  definitions: {
    ...o.definitions,
    [objName]: {
      ...Object.entries(o.definitions[objName])
        .filter(([a]) => a !== "switch")
        .map(([a, b]) => ({ [a]: b }))
        .reduce((a, b) => ({ ...a, ...b }), {})
    }
  }
});

interface StringSchema {
  type: "string";
}

interface IntegerSchema {
  type: "integer";
}

interface NumberSchema {
  type: "number";
}

interface BooleanSchema {
  type: "boolean";
}

interface ArraySchema {
  type: "array";
  items: JSONSchema;
}

interface ObjectSchema {
  type: "object";
  properties: { [key: string]: JSONSchema };
  required?: Array<string>;
  patternProperties?: { "^x-"?: {} };
}

interface PatternedRecordSchema {
  type: "object";
  patternProperties: { [key: string]: JSONSchema };
}

interface RecordSchema {
  type: "object";
  additionalProperties: JSONSchema;
}

interface AnyOfSchema {
  anyOf: JSONSchema[];
}

interface RefSchema {
  $ref: string;
}

interface EmptySchema {}

type JSONSchema =
  | StringSchema
  | RecordSchema
  | IntegerSchema
  | NumberSchema
  | BooleanSchema
  | ArraySchema
  | ObjectSchema
  | EmptySchema
  | RefSchema;

function getRequiredProperties(schema: ObjectSchema): { [key: string]: true } {
  const required: { [key: string]: true } = {};
  if (schema.required) {
    schema.required.forEach(function(k) {
      required[k] = true;
    });
  }
  return required;
}

function toInterfaceCombinator(
  schema: ObjectSchema
): t.InterfaceCombinator | t.BrandCombinator {
  const required = getRequiredProperties(schema);
  // const acceptsX = schema.patternProperties && schema.patternProperties["^x-"] !== undefined;
  const out = t.interfaceCombinator(
    Object.keys(schema.properties).map(key =>
      t.property(key, to(schema.properties[key]), !required.hasOwnProperty(key))
    )
  );
  return out;
}

const isBoolean = (u: unknown): u is BooleanSchema =>
  u && typeof u === "object" && (<BooleanSchema>u).type === "boolean";

const isNumber = (u: unknown): u is NumberSchema =>
  u && typeof u === "object" && (<NumberSchema>u).type === "number";

const isInteger = (u: unknown): u is IntegerSchema =>
  u && typeof u === "object" && (<IntegerSchema>u).type === "integer";

const isArray = (u: unknown): u is ArraySchema =>
  u && typeof u === "object" && (<ArraySchema>u).type === "array";

const isRecord = (u: unknown): u is RecordSchema =>
  u &&
  typeof u === "object" &&
  (<ObjectSchema>u).properties === undefined &&
  typeof (<RecordSchema>u).additionalProperties === "object";

const isEmpty = (u: unknown): u is EmptySchema =>
  u && typeof u === "object" && Object.keys(<object>u).length === 0;

const isPatternedRecord = (u: unknown): u is PatternedRecordSchema =>
  u &&
  typeof u === "object" &&
  (<ObjectSchema>u).properties === undefined &&
  typeof (<PatternedRecordSchema>u).patternProperties === "object";

const isObject = (u: unknown): u is ObjectSchema =>
  u &&
  typeof u === "object" &&
  (<ObjectSchema>u).type === "object" &&
  (<ObjectSchema>u).properties !== undefined;

const isRef = (u: unknown): u is RefSchema =>
  u && typeof u === "object" && (<RefSchema>u).$ref !== undefined;

const isAnyOf = (u: unknown): u is AnyOfSchema =>
  u && typeof u === "object" && (<AnyOfSchema>u).anyOf !== undefined;

const makeTypeGuard = (a: string, b: JSONSchema) => {
  const typeGuard =
    isObject(b) &&
    b.patternProperties &&
    b.patternProperties["^x-"] !== undefined
      ? ` && new Set([...${JSON.stringify(
          Object.keys(b.properties)
        )}, ...Object.keys(u)]).size === ${Object.keys(b.properties).length}`
      : "";
  return `export const is${a} = (u: unknown): u is ${a} => ${a}.is(u)${typeGuard};`;
};
const to = (schema: JSONSchema): t.TypeReference =>
  isRef(schema)
    ? t.identifier(schema.$ref.split("/").slice(-1)[0])
    : isAnyOf(schema)
    ? t.unionCombinator(schema.anyOf.map(i => to(i)))
    : isRecord(schema)
    ? t.recordCombinator(t.stringType, to(schema.additionalProperties))
    : isObject(schema)
    ? toInterfaceCombinator(schema)
    : isPatternedRecord(schema)
    ? t.recordCombinator(
        t.stringType,
        to(Object.entries(schema.patternProperties).filter(
          ([a]) => a !== "^x-"
        )[0][1] as JSONSchema)
      )
    : isArray(schema)
    ? t.arrayCombinator(to(schema.items))
    : isNumber(schema)
    ? t.numberType
    : isInteger(schema)
    ? t.numberType // t.intType - because this causes weirdness in the types, we let go
    : isBoolean(schema)
    ? t.booleanType
    : isEmpty(schema)
    ? t.nullType
    : t.stringType; // no need for string schema

const numberHack = (s: string) =>
  new Array(500)
    .fill(null)
    .map((_, j) => j)
    .reduce(
      (a, b) =>
        a
          .replace(`${b + 100}:`, `"${b + 100}":`)
          .replace(`${b + 100}?:`, `"${b + 100}"?:`)
          .replace(/t.null/g, "t.any")
          .replace(/null/g, "any"),
      s
    );
const doStuff = ({
  input,
  output,
  toplevel,
  responsesName,
  pathItemName,
  httpSecuritySchemaName
}: {
  input: string;
  output: string;
  toplevel: string;
  responsesName: string;
  httpSecuritySchemaName: string;
  pathItemName: string;
}) => {
  const full = unswitch(
    HTTPSecuritySchemeHack(httpSecuritySchemaName)(
      ResponsesHack(responsesName)(
        PathItemHack(pathItemName)(yaml.load(fs.readFileSync(input).toString()))
      )
    )
  );
  const { definitions, ...fullObj } = full;

  const declarations = Object.entries(definitions)
    .map(([a, b]) => t.typeDeclaration(a, to(b as JSONSchema)))
    .concat(t.typeDeclaration(toplevel, to(fullObj as JSONSchema)));
  const sorted = t.sort(declarations);
  const typeGuards = Object.entries(definitions).map(([a, b]) =>
    makeTypeGuard(a, b as JSONSchema)
  );
  fs.writeFileSync(
    output,
    numberHack(
      prettier.format(
        [
          `import * as t from "io-ts";
`
        ]
          .concat(sorted.map(d => t.printRuntime(d)))
          .concat(sorted.map(d => `export ${t.printStatic(d)}`))
          .concat(typeGuards)
          .join("\n"),
        {
          parser: "typescript"
        }
      )
    )
  );
};

doStuff({
  input: "./schema/full.yml",
  output: "./src/generated/full.ts",
  toplevel: "OpenAPIObject",
  responsesName: "Responses",
  pathItemName: "PathItem",
  httpSecuritySchemaName: "HTTPSecurityScheme"
});
doStuff({
  input: "./schema/lazy.yml",
  output: "./src/generated/lazy.ts",
  toplevel: "$OpenAPIObject",
  responsesName: "$$Responses",
  pathItemName: "$$PathItem",
  httpSecuritySchemaName: "$HTTPSecurityScheme"
});
