import * as t from "io-ts";
import { DiscriminatorObject } from "./discriminator";
import { ReferenceObject } from "./reference";
import { XMLObject } from "./xml";
import { SpecificationExtension } from "./specification-extension";
import { _is, L, _type } from "./util";

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
}

type BaseNumericObject = BaseSchemaObject
    & {
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

type BaseIntegerObject = BaseNumericObject
    & {
        type: "integer";
        format: "int32" | "int64";
    };

const isBaseIntegerObject = (u: unknown): u is BaseIntegerObject =>
    _is({
        type: new L("integer"),
        format: ["int32", "int64"].map(i => new L(i))
    }, isBaseNumericObject)(u);


const BaseIntegerObject = _type<BaseIntegerObject>(
    "BaseIntegerObject",
    isBaseIntegerObject
);

type BaseNumberObject = BaseNumericObject
    & {
        type: "number",
        format: "double" | "float"
    };

const isBaseNumberObject = (u: unknown): u is BaseNumberObject =>
    _is({
        type: new L("number"),
        format: ["double", "float"].map(i => new L(i))
    }, isBaseNumericObject)(u);

const BaseNumberObject = _type<BaseNumberObject>(
    "BaseNumberObject",
    isBaseNumberObject
);

type BaseStringObject = BaseSchemaObject
    & {
        type: "string",
        required?: boolean,
        default?: number,
        example?: number,
    };

const isBaseStringObject = (u: unknown): u is BaseStringObject =>
    _is({
        type: new L("string"),
    }, {
        required: "boolean",
        default: "string",
        example: "string",
        ...isBaseSchemaObject
    })(u);

const BaseStringObject = _type<BaseStringObject>(
    "BaseStringObject",
    isBaseStringObject
);

type BaseBooleanObject = BaseSchemaObject
    & {
        type: "boolean",
        required?: boolean,
        default?: boolean,
        example?: boolean,
    };

const isBaseBooleanObject = (u: unknown): u is BaseBooleanObject =>
    _is({
        type: new L("boolean"),
    }, {
        required: "boolean",
        default: "boolean",
        example: "boolean",
        ...isBaseSchemaObject
    })(u);

const BaseBooleanObject = _type<BaseBooleanObject>(
    "BaseBooleanObject",
    isBaseBooleanObject
);

type BaseEnumType<T extends "string" | "number", Q extends string | number> = BaseSchemaObject
    & {
        type: T,
        enum: Q[]
    };

type EnumStringObject = BaseEnumType<"string", string>;
type EnumIntegerObject = BaseEnumType<"number", number>;

const enumCheck = <T extends "string" | "number", Q extends string | number>(v: unknown): boolean =>
    (v as BaseEnumType<T, Q>).enum.indexOf(v as Q) !== -1;

const isEnumValid = <T extends "string" | "number", Q extends string | number>(tp: string) => (u: unknown): u is BaseEnumType<T, Q> =>
    _is({
        type: new L(tp),
        ...(tp === "number" ? ({format: ["int32", "int64"].map(i => new L(i))}) : {}),
        enum: (v) => v instanceof Array && v.map(i => typeof i === tp).reduce((a, b) => a && b, true)
    }, {
        required: "boolean",
        default: enumCheck,
        example: enumCheck,
        ...isBaseSchemaObject
    })(u);

const isEnumIntegerObject = isEnumValid<"number", number>("number");
const EnumIntegerObject = _type<EnumIntegerObject>(
    "EnumIntegerObject",
    isEnumIntegerObject
);

const isEnumStringObject = isEnumValid<"string", string>("string");
const EnumStringObject = _type<EnumStringObject>(
    "EnumStringObject",
    isEnumStringObject
);

type FormattedStringObject = BaseStringObject & {
    format: "binary" | "byte" | "date" | "date-time" | "password" 
}


const isFormattedStringObject = (u: unknown): u is FormattedStringObject =>
    _is({
        type: new L("string"),
        format: ["binary", "byte", "date", "date-time", "password"].map(i => new L(i)),
    }, {
        required: "boolean",
        default: "string",
        example: "string",
        ...isBaseSchemaObject
    })(u);

const FormattedStringObject = _type<FormattedStringObject>(
    "FormattedStringObject",
    isFormattedStringObject
);
    
type RegexStringObject = BaseStringObject & {
    pattern?: "string" 
}

const isRegexStringObject = (u: unknown): u is RegexStringObject =>
    _is({
        type: new L("string"),
        pattern: "string",
    }, {
        required: "boolean",
        default: "string",
        example: "string",
        ...isBaseSchemaObject
    })(u);

const RegexStringObject = _type<RegexStringObject>(
    "RegexStringObject",
    isRegexStringObject
);

type OpenAPIPrimitiveDataType = BaseStringObject
    | RegexStringObject
    | FormattedStringObject
    | BaseNumberObject
    | BaseIntegerObject
    | EnumIntegerObject
    | EnumStringObject
    | BaseBooleanObject;

const isOpenAPIPrimitiveDataType = (u: unknown): u is OpenAPIPrimitiveDataType =>
    isBaseStringObject(u)
    || isRegexStringObject(u)
    || isFormattedStringObject(u)
    || isBaseNumberObject(u)
    || isBaseIntegerObject(u)
    || isEnumIntegerObject(u)
    || isEnumStringObject(u)
    || isBaseBooleanObject(u);

export const OpenAPIPrimitiveDataType = _type<OpenAPIPrimitiveDataType>(
    "OpenAPIPrimitiveDataType",
    isOpenAPIPrimitiveDataType
);

type PropertyAddons = {
    readOnly?: boolean;
    writeOnly?: boolean;
    xml?: XMLObject;
}
type OpenAPIObjectType = BaseSchemaObject & {
    properties?: {[s: string]: SchemaObject } // & PropertyAddons
    additionalProperties?: {[s: string]: SchemaObject } // & PropertyAddons
    default?: any; // hack, fix on the validator...
    example?: any; // hack, fix on the validator...
    maxProperties?: number;
    minProperties?: number;
}

const isPropertyAddons = {
    readOnly: t.boolean,
    writeOnly: t.boolean,
    xml: XMLObject
};

const tailIsSchemaObject = (l: any[]): boolean =>
    l.length === 0 ? true : isSchemaObject(l[0]) ? tailIsSchemaObject(l.slice(1)) : false;

const isOpenAPIObjectType = (u: unknown): u is OpenAPIObjectType =>
    _is({
        type: new L("object"),
    }, {
        properties: (v) => v && tailIsSchemaObject(Object.values(v as any)), // & PropertyAddons
        additionalProperties: (v) => v && tailIsSchemaObject(Object.values(v as any)),
        default: "object", // hack, fix on the validator...
        example: "object", // hack, fix on the validator...
        maxProperties: "number",
        minProperties: "number",
        ...isBaseSchemaObject
    })(u);

const OpenAPIObjectType: t.Type<OpenAPIObjectType> = t.recursion("OpenAPIObjectType", () =>
    _type<OpenAPIObjectType>(
        "OpenAPIObjectType",
        isOpenAPIObjectType
    )
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
}

const isOpenApiArrayType = (u: unknown): u is OpenApiArrayType =>
    _is({
        type: new L("array"),
    }, {
        items: isSchemaObject,
        default: "object", // hack, fix on the validator...
        example: "object", // hack, fix on the validator...
        required: "boolean",
        uniqueItems: "boolean",
        minLength: "number",
        maxLength: "number",
        minItems: "number",
        maxItems: "number",
        ...isBaseSchemaObject,
    })(u);

const OpenApiArrayType: t.Type<OpenApiArrayType> = t.recursion("OpenApiArrayType", () =>
    _type<OpenApiArrayType>(
        "OpenApiArrayType",
        isOpenApiArrayType
    )
);

/*
type DiscriminatorSchema = BaseSchemaObject & Partial<DiscriminatorObject>;

const DiscriminatorPartial = t.partial({
    propertyName: t.string,
    mapping: t.record(t.string, t.string)
});

const NotType: t.Type<NotType> = t.recursion("NotType", () =>
    t.intersection([
        BaseSchemaObject,
        t.type({
            not: t.union([SchemaObject, t.array(SchemaObject)]),
        }),
        DiscriminatorPartial
    ])
);

type NotType = DiscriminatorSchema & {
    not: SchemaObject | SchemaObject[];
}

const AllOfType: t.Type<AllOfType> = t.recursion("AllOfType", () =>
    t.intersection([
        BaseSchemaObject,
        t.type({
            allOf: t.union([SchemaObject, t.array(SchemaObject)]),
        }),
        DiscriminatorPartial
    ])
);

type AllOfType = DiscriminatorSchema & {
    allOf: SchemaObject | SchemaObject[];
}

const AnyOfType: t.Type<AnyOfType> = t.recursion("AnyOfType", () =>
    t.intersection([
        BaseSchemaObject,
        t.type({
            anyOf: t.union([SchemaObject, t.array(SchemaObject)]),
        }),
        DiscriminatorPartial
    ])
);

type AnyOfType = DiscriminatorSchema & {
    anyOf: SchemaObject | SchemaObject[];
}

const OneOfType: t.Type<OneOfType> = t.recursion("OneOfType", () =>
    t.intersection([
        BaseSchemaObject,
        t.type({
            oneOf: t.union([SchemaObject, t.array(SchemaObject)]),
        }),
        DiscriminatorPartial
    ])
);

type OneOfType = DiscriminatorSchema & {
    oneOf: SchemaObject | SchemaObject[];
}

*/
export type SchemaObject = OpenAPIObjectType
    | OpenApiArrayType
    | OpenAPIPrimitiveDataType;
    // | OneOfType
    // | NotType
    // | AnyOfType
    // | AllOfType
    // | ReferenceObject;

const isSchemaObject = (u: unknown): u is SchemaObject => isOpenAPIObjectType(u)
    || isOpenApiArrayType(u)
    || isOpenAPIPrimitiveDataType(u);

export const SchemaObject: t.Type<SchemaObject> = t.recursion("SchemaObject", () =>
    _type<SchemaObject>("SchemaObject", isSchemaObject)
);
