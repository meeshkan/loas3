import t, { Type } from "io-ts";
import { DiscriminatorObject } from "./discriminator";
import { ReferenceObject } from "./reference";
import { XMLObject } from "./xml";
import { SpecificationExtension } from "./specification-extension";

const BaseSchemaObject = t.partial({
    title: t.string,
    description: t.string,
    nullable: t.boolean,
    externalDocs: t.string,
    deprecated: t.boolean
});
type BaseSchemaObject = t.TypeOf<typeof BaseSchemaObject>;

const BaseIntegerObject = t.intersection([
    BaseSchemaObject,
    t.type({
        type: t.literal("integer"),
        format: t.union([t.literal("int32"), t.literal("int64")])
    }),
    t.partial({
        required: t.boolean,
        default: t.Int,
        example: t.Int,
    })
]);
type BaseIntegerObject = t.TypeOf<typeof BaseIntegerObject>;


const BaseNumberObject = t.intersection([
    BaseSchemaObject,
    t.type({
        type: t.literal("number"),
        format: t.union([t.literal("float"), t.literal("double")])
    }),
    t.partial({
        required: t.boolean,
        default: t.number,
        example: t.number,
    })
]);
type BaseNumberObject = t.TypeOf<typeof BaseNumberObject>;

const BaseStringObject = t.intersection([
    BaseSchemaObject,
    t.type({
        type: t.literal("string"),
    }),
    t.partial({
        required: t.boolean,
        default: t.string,
        example: t.string,
    })
]);
type BaseStringObject = t.TypeOf<typeof BaseStringObject>;

const isEnumValid = <T>(f: (t: T) => boolean) => (u: unknown): u is {
    enum: T[];
    default?: T;
} =>
    typeof u === "object" &&
        Object.keys(u as object).indexOf("enum") !== -1 &&
        (!(u as { enum: T[]; default?: T; }).default || (u as { enum: T[]; default?: T; }).enum.indexOf((u as { enum: T[]; default?: T; }).default as T) !== -1) &&
        (u as {
            enum: T[];
            default?: T;
        }).enum.map(i => f(i)).reduce((a, b) => a && b, true);

const isEnumInteger = isEnumValid<number>(t => Number.isInteger(t));
const isEnumNumber = isEnumValid<number>(t => typeof t === "number");
const isEnumString = isEnumValid<string>(t => typeof t === "string");

const makeEnumObject = <T>(name: string, validator: (u: unknown) => u is {
    enum: T[];
    default?: T;
}) => new t.Type<{
    enum: T[];
    default?: T;
    example?: T;
}>(
    name,
    validator,
    (u, c) => (validator(u) ? t.success(u) : t.failure(u, c)),
    t.identity
);

const EnumIntegerObject = t.intersection([
    BaseIntegerObject,
    makeEnumObject<number>("EnumInteger", isEnumInteger)
]);
type EnumIntegerObject = t.TypeOf<typeof EnumIntegerObject>;

const EnumNumberObject = t.intersection([
    BaseNumberObject,
    makeEnumObject<number>("EnumNumber", isEnumNumber)
]);
type EnumNumberObject = t.TypeOf<typeof EnumNumberObject>;

const EnumStringObject = t.intersection([
    BaseStringObject,
    makeEnumObject<string>("EnumString", isEnumString)
]);
type EnumStringObject = t.TypeOf<typeof EnumStringObject>;

const makeNumberBoundsObject = <T extends Type<any>> (c: T) => t.partial({
    multipleOf: c,
    maximum: c,
    exclusiveMaximum: c,
    minimum: t.number,
    exclusiveMinimum: t.Int,
});

const BoundedIntObject = t.intersection([
    BaseIntegerObject,
    makeNumberBoundsObject(t.Int)
]);
type BoundedIntObject = t.TypeOf<typeof BoundedIntObject>;

const BoundedNumberObject = t.intersection([
    BaseNumberObject,
    makeNumberBoundsObject(t.number)
]);
type BoundedNumberObject = t.TypeOf<typeof BoundedNumberObject>;

const FormattedStringObject = t.intersection([
    BaseStringObject,
    t.partial({
        format: t.union([t.literal("binary"), t.literal("byte"), t.literal("date"), t.literal("date-time"), t.literal("password")])
    })
]);
type FormattedStringObject = t.TypeOf<typeof FormattedStringObject>;

const RegexStringObject = t.intersection([
    BaseStringObject,
    t.partial({
        pattern: t.string, // TODO: show valid regex?
    })
]);
type RegexStringObject = t.TypeOf<typeof RegexStringObject>;

const BaseBooleanObject = t.intersection([
    BaseSchemaObject,
    t.type({
        type: t.literal("boolean")
    }),
    t.partial({
        required: t.boolean,
        default: t.boolean,
        example: t.boolean
    })
]);
type BaseBooleanObject = t.TypeOf<typeof BaseBooleanObject>;

const OpenAPIPrimitiveDataType = t.union([
    RegexStringObject,
    FormattedStringObject,
    BoundedNumberObject,
    BoundedIntObject,
    EnumIntegerObject,
    EnumNumberObject,
    EnumStringObject,
    BaseBooleanObject,
]);

type OpenAPIPrimitiveDataType = t.TypeOf<typeof OpenAPIPrimitiveDataType>;

const PropertyAddons = t.partial({
    readOnly: t.boolean,
    writeOnly: t.boolean,
    xml: XMLObject
});
type PropertyAddons = t.TypeOf<typeof PropertyAddons>;

type OpenAPIObjectType = BaseSchemaObject & {
    properties: {[s: string]: SchemaObject & PropertyAddons }
    additionalProperties: {[s: string]: SchemaObject & PropertyAddons }
    default?: any; // hack, fix on the validator...
    example?: any; // hack, fix on the validator...
    maxProperties?: number;
    minProperties?: number;
}

const OpenAPIObjectType: t.Type<OpenAPIObjectType> = t.recursion("OpenAPIObjectType", () =>
    t.intersection([
        BaseSchemaObject,
        t.type({
            properties: t.record(t.string, t.intersection([SchemaObject, PropertyAddons])),
            additionalProperties: t.record(t.string, t.intersection([SchemaObject, PropertyAddons])),
        }),
        t.partial({
            default: t.any, // hack, fix on the validator...
            example: t.any,// hack, fix on the validator...
            maxProperties: t.number,
            minProperties: t.number,
        })
    ])
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

const OpenApiArrayType: t.Type<OpenApiArrayType> = t.recursion("OpenApiArrayType", () =>
    t.intersection([
        BaseSchemaObject,
        t.type({
            items: SchemaObject,
        }),
        t.partial({
            default: t.any, // hack, fix on the validator...
            example: t.any,// hack, fix on the validator...
            required: t.boolean,
            uniqueItems: t.boolean,
            minLength: t.number,
            maxLength: t.number,
            minItems: t.number,
            maxItems: t.number,
        })
    ])
);

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

export const SchemaObject = t.intersection([t.union([OpenApiArrayType,
    OpenAPIObjectType,
    OpenAPIPrimitiveDataType,
    OneOfType,
    NotType,
    AnyOfType,
    AllOfType,
    ReferenceObject]), SpecificationExtension]);

export type SchemaObject = (OpenApiArrayType
    | OpenAPIObjectType
    | OpenAPIPrimitiveDataType
    | OneOfType
    | NotType
    | AnyOfType
    | AllOfType
    | ReferenceObject) & SpecificationExtension;
