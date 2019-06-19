import * as t from "io-ts";
import { ReferenceObject } from "./reference";
import { XMLObject } from "./xml";
import { _is, L, _type, _choose } from "./util";

const isBaseSchemaObject = {
  title: "string",
  description: "string",
  nullable: "boolean",
  externalDocs: "string",
  deprecated: "boolean"
};

type BaseSchemaObject = {
  title?: string;
  description?: string;
  nullable?: boolean;
  externalDocs?: string;
  deprecated?: boolean;
};

type BaseNumericObject = BaseSchemaObject & {
  required?: boolean;
  default?: number;
  example?: number;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;
};

const isBaseNumericObject = {
  required: "boolean",
  default: "number",
  example: "number",
  multipleOf: "number",
  maximum: "number",
  exclusiveMaximum: "number",
  minimum: "number",
  exclusiveMinimum: "number",
  ...isBaseSchemaObject
};

type BaseIntegerObject = BaseNumericObject & {
  type: "integer";
  format: "int32" | "int64";
};

const isBaseIntegerObject = (u: unknown): u is BaseIntegerObject =>
  _is(
    {
      type: new L("integer"),
      format: ["int32", "int64"].map(i => new L(i))
    },
    isBaseNumericObject
  )(u);

const BaseIntegerObject = _type<BaseIntegerObject>(
  "BaseIntegerObject",
  isBaseIntegerObject
);

type BaseNumberObject = BaseNumericObject & {
  type: "number";
  format: "double" | "float";
};

const isBaseNumberObject = (u: unknown): u is BaseNumberObject =>
  _is(
    {
      type: new L("number"),
      format: ["double", "float"].map(i => new L(i))
    },
    isBaseNumericObject
  )(u);

const BaseNumberObject = _type<BaseNumberObject>(
  "BaseNumberObject",
  isBaseNumberObject
);

type BaseStringObject = BaseSchemaObject & {
  type: "string";
  required?: boolean;
  default?: number;
  example?: number;
};

const isBaseStringObject = (u: unknown): u is BaseStringObject =>
  _is(
    {
      type: new L("string")
    },
    {
      required: "boolean",
      default: "string",
      example: "string",
      ...isBaseSchemaObject
    }
  )(u);

const BaseStringObject = _type<BaseStringObject>(
  "BaseStringObject",
  isBaseStringObject
);

type BaseBooleanObject = BaseSchemaObject & {
  type: "boolean";
  required?: boolean;
  default?: boolean;
  example?: boolean;
};

const isBaseBooleanObject = (u: unknown): u is BaseBooleanObject =>
  _is(
    {
      type: new L("boolean")
    },
    {
      required: "boolean",
      default: "boolean",
      example: "boolean",
      ...isBaseSchemaObject
    }
  )(u);

const BaseBooleanObject = _type<BaseBooleanObject>(
  "BaseBooleanObject",
  isBaseBooleanObject
);

type BaseEnumType<
  T extends "string" | "number",
  Q extends string | number
> = BaseSchemaObject & {
  type: T;
  enum: Q[];
  default?: Q;
  example?: Q;
  required?: boolean;
};

type EnumStringObject = BaseEnumType<"string", string>;
type EnumIntegerObject = BaseEnumType<"number", number>;

const enumCheck = <T extends "string" | "number", Q extends string | number>(
  u: unknown
) => (v: unknown): boolean =>
  (u as BaseEnumType<T, Q>).enum.indexOf(v as Q) !== -1;

const isEnumValid = <T extends "string" | "number", Q extends string | number>(
  tp: string
) => (u: unknown): u is BaseEnumType<T, Q> =>
  _is<BaseEnumType<T, Q>>(
    {
      type: new L(tp),
      ...(tp === "integer"
        ? { format: ["int32", "int64"].map(i => new L(i)) }
        : {}),
      enum: v =>
        v instanceof Array &&
        v
          .map(i => typeof i === (tp === "integer" ? "number" : tp))
          .reduce((a, b) => a && b, true)
    },
    {
      required: "boolean",
      default: enumCheck(u),
      example: enumCheck(u),
      ...isBaseSchemaObject
    }
  )(u);

const isEnumIntegerObject = isEnumValid<"number", number>("integer");
export const EnumIntegerObject = _type<EnumIntegerObject>(
  "EnumIntegerObject",
  isEnumIntegerObject
);

const isEnumStringObject = isEnumValid<"string", string>("string");
const EnumStringObject = _type<EnumStringObject>(
  "EnumStringObject",
  isEnumStringObject
);

type FormattedStringObject = BaseStringObject & {
  format: "binary" | "byte" | "date" | "date-time" | "password";
};

const isFormattedStringObject = (u: unknown): u is FormattedStringObject =>
  _is(
    {
      type: new L("string"),
      format: ["binary", "byte", "date", "date-time", "password"].map(
        i => new L(i)
      )
    },
    {
      required: "boolean",
      default: "string",
      example: "string",
      ...isBaseSchemaObject
    }
  )(u);

const FormattedStringObject = _type<FormattedStringObject>(
  "FormattedStringObject",
  isFormattedStringObject
);

type RegexStringObject = BaseStringObject & {
  pattern?: "string";
};

const isRegexStringObject = (u: unknown): u is RegexStringObject =>
  _is(
    {
      type: new L("string"),
      pattern: "string"
    },
    {
      required: "boolean",
      default: "string",
      example: "string",
      ...isBaseSchemaObject
    }
  )(u);

const RegexStringObject = _type<RegexStringObject>(
  "RegexStringObject",
  isRegexStringObject
);

type OpenAPIPrimitiveDataType =
  | BaseStringObject
  | RegexStringObject
  | FormattedStringObject
  | BaseNumberObject
  | BaseIntegerObject
  | EnumIntegerObject
  | EnumStringObject
  | BaseBooleanObject;

const isOpenAPIPrimitiveDataType = (
  u: unknown
): u is OpenAPIPrimitiveDataType =>
  isBaseStringObject(u) ||
  isRegexStringObject(u) ||
  isFormattedStringObject(u) ||
  isBaseNumberObject(u) ||
  isBaseIntegerObject(u) ||
  isEnumIntegerObject(u) ||
  isEnumStringObject(u) ||
  isBaseBooleanObject(u);

export const OpenAPIPrimitiveDataType = _type<OpenAPIPrimitiveDataType>(
  "OpenAPIPrimitiveDataType",
  isOpenAPIPrimitiveDataType
);

type PropertyAddons = {
  readOnly?: boolean;
  writeOnly?: boolean;
  xml?: XMLObject;
};
type OpenAPIObjectType = BaseSchemaObject & {
  type: "object";
  required?: string[];
  properties?: { [s: string]: SchemaObject }; // & PropertyAddons
  additionalProperties?: SchemaObject | boolean; // & PropertyAddons
  default?: any; // hack, fix on the validator...
  example?: any; // hack, fix on the validator...
  maxProperties?: number;
  minProperties?: number;
};

// TODO add these to schema when property
/*
{
  readOnly: t.boolean,
  writeOnly: t.boolean,
  xml: XMLObject
};
*/
const tailIsSchemaObject = (l: any[]): boolean =>
  l.length === 0
    ? true
    : isSchemaObject(l[0])
    ? tailIsSchemaObject(l.slice(1))
    : false;

const isOpenAPIObjectType = (u: unknown): u is OpenAPIObjectType =>
  _is(
    {
      properties: v => v && tailIsSchemaObject(Object.values(v as any)) // & PropertyAddons
    },
    {
      type: new L("object"),
      required: v =>
        v instanceof Array &&
        new Set([
          ...v,
          ...Object.keys((u as any).properties ? (u as any).properties : {})
        ]).size ===
          Object.keys((u as any).properties ? (u as any).properties : {})
            .length,
      additionalProperties: v =>
        v && (typeof v === "boolean" || _choose([SchemaObject])(v)),
      default: (_: any) => true, // hack, fix on the validator...
      example: (_: any) => true, // hack, fix on the validator...
      maxProperties: "number",
      minProperties: "number",
      ...isBaseSchemaObject
    }
  )(u);

const OpenAPIObjectType: t.Type<OpenAPIObjectType> = t.recursion(
  "OpenAPIObjectType",
  () => _type<OpenAPIObjectType>("OpenAPIObjectType", isOpenAPIObjectType)
);

type OpenApiArrayType = BaseSchemaObject & {
  items: SchemaObject;
  default?: any[]; // hack, fix on the validator...
  example?: any[]; // hack, fix on the validator...
  required?: boolean;
  uniqueItems?: boolean;
  minLength?: number;
  maxLength?: number;
  minItems?: number;
  maxItems?: number;
};

const isOpenApiArrayType = (u: unknown): u is OpenApiArrayType =>
  _is(
    {
      type: new L("array")
    },
    {
      items: isSchemaObject,
      default: (_: any) => true, // hack, fix on the validator...
      example: (_: any) => true, // hack, fix on the validator...
      required: "boolean",
      uniqueItems: "boolean",
      minLength: "number",
      maxLength: "number",
      minItems: "number",
      maxItems: "number",
      ...isBaseSchemaObject
    }
  )(u);

const OpenApiArrayType: t.Type<OpenApiArrayType> = t.recursion(
  "OpenApiArrayType",
  () => _type<OpenApiArrayType>("OpenApiArrayType", isOpenApiArrayType)
);

type DiscriminatorSchema = BaseSchemaObject & {
  propertyName?: string;
  mapping?: { [key: string]: string };
};

const isDiscriminator = (u: unknown) => ({
  propertyName: "string",
  mapping: (v: any) =>
    v &&
    u &&
    typeof u === "object" &&
    typeof v === "object" &&
    typeof (u as any).propertyName === "string" &&
    Object.values(v)
      .map(i => typeof i === "string")
      .reduce((a, b) => a && b, true)
});

type NotType = DiscriminatorSchema & {
  not: SchemaObject | SchemaObject[];
};

type OneOfType = DiscriminatorSchema & {
  not: SchemaObject | SchemaObject[];
};

type AllOfType = DiscriminatorSchema & {
  not: SchemaObject | SchemaObject[];
};

type AnyOfType = DiscriminatorSchema & {
  not: SchemaObject | SchemaObject[];
};

const isAggType = <T>(name: string) => (u: unknown): u is T =>
  _is(
    {
      [name]: v =>
        v instanceof Array ? tailIsSchemaObject(v) : isSchemaObject(v)
    },
    {
      required: "boolean",
      ...isBaseSchemaObject,
      ...isDiscriminator(u)
    }
  )(u);
const isNotType = isAggType<NotType>("not");
const isAnyOfType = isAggType<AnyOfType>("anyOf");
const isAllOfType = isAggType<AllOfType>("oneOf");
const isOneOfType = isAggType<OneOfType>("allOf");
export const NotType = _type<NotType>("NotType", isNotType);
export const AnyOfType = _type<AnyOfType>("AnyOfType", isAnyOfType);
export const AllOfType = _type<AllOfType>("AllOfType", isAllOfType);
export const OneOfType = _type<OneOfType>("OneOfType", isOneOfType);

export type SchemaObject =
  | OpenAPIObjectType
  | OpenApiArrayType
  | OpenAPIPrimitiveDataType
  | OneOfType
  | NotType
  | AnyOfType
  | AllOfType
  | ReferenceObject;

const isSchemaObject = (u: unknown): u is SchemaObject =>
  OpenAPIObjectType.is(u) ||
  OpenApiArrayType.is(u) ||
  OpenAPIPrimitiveDataType.is(u) ||
  OneOfType.is(u) ||
  NotType.is(u) ||
  AnyOfType.is(u) ||
  AllOfType.is(u) ||
  ReferenceObject.is(u);

export const SchemaObject: t.Type<SchemaObject> = t.recursion(
  "SchemaObject",
  () => _type<SchemaObject>("SchemaObject", isSchemaObject)
);
