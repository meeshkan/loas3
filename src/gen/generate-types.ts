import * as t from "io-ts-codegen";
import yaml from "js-yaml";
import fs from "fs";

const ci = <T>(i: T) => {
  process.stdout.write(`${JSON.stringify(i)}
`);
  return i;
};

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
                anyOf: [
                  unswitch(b[0].then),
                  ...(b[1] && b[1].then ? [unswitch(b[1].then)] : [])
                ]
              }
            : { [a]: unswitch(b) }
        )
        .reduce((a, b) => ({ ...a, ...b }), {})
    : o;

const PathItemHack = (o: any, name?: string): any =>
  o === null
    ? null
    : o instanceof Array
    ? o.map(i => PathItemHack(i))
    : typeof o === "object"
    ? {
        ...Object.entries(o)
          .map(([a, b]) => ({ [a]: PathItemHack(b, a) }))
          .reduce((a, b) => ({ ...a, ...b }), {}),
        properties: {
          ...(o.properties ? o.properties : {}),
          ...(name === "PathItem"
            ? "get|put|post|delete|options|head|patch|trace)"
                .split("|")
                .map(i => ({
                  [i]:
                    o.patternProperties[
                      "^(get|put|post|delete|options|head|patch|trace)$"
                    ]
                }))
                .reduce((a, b) => ({ ...a, ...b }), {})
            : {})
        }
      }
    : o;

const ResponsesHack = (o: any, name?: string): any =>
  o === null
    ? null
    : o instanceof Array
    ? o.map(i => ResponsesHack(i))
    : typeof o === "object"
    ? {
        ...Object.entries(o)
          .map(([a, b]) => ({ [a]: ResponsesHack(b, a) }))
          .reduce((a, b) => ({ ...a, ...b }), {}),
        properties: {
          ...(o.properties ? o.properties : {}),
          ...(name === "Responses"
            ? new Array(400)
                .fill(null)
                .map((_, j) => ({
                  [`${100 + j}`]: o.patternProperties["^[1-5](?:\\d{2}|XX)$"]
                }))
                .reduce((a, b) => ({ ...a, ...b }), {})
            : {})
        }
      }
    : o;

const full = ResponsesHack(
  PathItemHack(
    unswitch(yaml.load(fs.readFileSync("./schema/full.yml").toString()))
  )
);
// process.stdout.write(`${JSON.stringify(full)}
// `);
// process.exit(0);
export interface StringSchema {
  type: "string";
}

export interface IntegerSchema {
  type: "integer";
}

export interface NumberSchema {
  type: "number";
}

export interface BooleanSchema {
  type: "boolean";
}

export interface ArraySchema {
  type: "array";
  items: JSONSchema;
}

export interface ObjectSchema {
  type: "object";
  properties: { [key: string]: JSONSchema };
  required?: Array<string>;
  patternProperties?: { "^x-"?: {} };
}

export interface PatternedRecordSchema {
  type: "object";
  patternProperties: { [key: string]: JSONSchema };
}

export interface RecordSchema {
  type: "object";
  additionalProperties: JSONSchema;
}

export interface AnyOfSchema {
  anyOf: JSONSchema[];
}

export interface RefSchema {
  $ref: string;
}

export type JSONSchema =
  | StringSchema
  | RecordSchema
  | IntegerSchema
  | NumberSchema
  | BooleanSchema
  | ArraySchema
  | ObjectSchema
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

function toInterfaceCombinator(schema: ObjectSchema): t.InterfaceCombinator {
  const required = getRequiredProperties(schema);
  return t.interfaceCombinator(
    Object.keys(schema.properties).map(key =>
      t.property(key, to(schema.properties[key]), !required.hasOwnProperty(key))
    )
  );
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

export const to = (schema: JSONSchema): t.TypeReference =>
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
    ? t.intType
    : isBoolean(schema)
    ? t.booleanType
    : t.stringType; // no need for string schema

const { definitions, ...fullObj } = full;

const declarations = Object.entries(definitions)
  .map(([a, b]) =>
    t.typeDeclaration(
      a,
      t.recursiveCombinator(t.identifier(a), a, to(b as JSONSchema))
    )
  )
  .concat(
    t.typeDeclaration(
      "OpenAPIObject",
      t.recursiveCombinator(
        t.identifier("OpenAPIObject"),
        "OpenAPIObject",
        to(fullObj as JSONSchema)
      )
    )
  );

/*
export interface StringSchema {
  type: 'string'
}

export interface NumberSchema {
  type: 'number'
}

export interface BooleanSchema {
  type: 'boolean'
}

export interface ObjectSchema {
  type: 'object'
  properties: { [key: string]: JSONSchema }
  required?: Array<string>
}

export type JSONSchema = StringSchema | NumberSchema | BooleanSchema | ObjectSchema

function getRequiredProperties(schema: ObjectSchema): { [key: string]: true } {
  const required: { [key: string]: true } = {}
  if (schema.required) {
    schema.required.forEach(function(k) {
      required[k] = true
    })
  }
  return required
}

function toInterfaceCombinator(schema: ObjectSchema): t.InterfaceCombinator {
  const required = getRequiredProperties(schema)
  return t.interfaceCombinator(
    Object.keys(schema.properties).map(key =>
      t.property(key, to(schema.properties[key]), !required.hasOwnProperty(key))
    )
  )
}

export function to(schema: JSONSchema): t.TypeReference {
  switch (schema.type) {
    case 'string':
      return t.stringType
    case 'number':
      return t.numberType
    case 'boolean':
      return t.booleanType
    case 'object':
      return toInterfaceCombinator(schema)
  }
}

*/
/*
const ib = t.interfaceCombinator([
  t.property("name", t.stringType),
  t.property("age", t.numberType)
], "Person");
const ptd = t.typeDeclaration(
  "Person",
  t.recursiveCombinator(t.identifier("Person"), "Person", ib)
);
const ic = t.interfaceCombinator([
  t.property("foo", t.stringType),
  t.property("bar", t.identifier('Person')),
]);

// list of type declarations
const declarations = [
  t.typeDeclaration("Persons", t.arrayCombinator(t.identifier("Person"))),
  ptd,
  t.typeDeclaration(
    "Shmerson",
    t.recursiveCombinator(t.identifier("Shmerson"), "Shmerson", ic)
  )
];
*/
// apply topological sort in order to get the right order
const sorted = t.sort(declarations);

fs.writeFileSync("pleasework.ts",
  sorted
    .map(d => t.printRuntime(d))
    .join("\n")
    .concat(sorted.map(d => t.printStatic(d)).join("\n"))
);
