import t from "io-ts";
import { SchemaObject } from "./schema";
import { SpecificationExtension } from "./specification-extension";

const BaseParameterObject = t.intersection([
    t.type({
        description: t.string,
        deprecated: t.boolean,
        schema: SchemaObject,
    }),
    t.partial({
        examples: t.array(t.any),
        example: t.any,
        explode: t.boolean
    }),
    SpecificationExtension
]);

export const KnownHeaderObject = t.intersection([
    t.partial({
        required: t.boolean,
        style: t.literal("simple")
    }),
    BaseParameterObject
])

export const HeaderObject = t.intersection([
    t.type({
        in: t.literal("header"),
        name: t.string,
    }),
    KnownHeaderObject
])

const KnownPathObject = t.intersection([
    t.type({
        required: t.literal(true),
    }),
    t.partial({
        style: t.union([
            t.literal("simple"),
            t.literal("matrix"),
            t.literal("label"),
        ])
    }),
    BaseParameterObject
])

const PathObject = t.intersection([
    t.type({
        in: t.literal("path"),
        name: t.string,
    }),
    KnownPathObject
])

const KnownQueryObject = t.intersection([
    t.partial({
        style: t.union([
            t.literal("form"),
            t.literal("spaceDelimited"),
            t.literal("pipeDelimited"),
            t.literal("deepObject"),
        ]),
        allowEmptyValue: t.boolean,
        allowReserved: t.boolean
    }),
    BaseParameterObject
]);

const QueryObject = t.intersection([
    t.type({
        in: t.literal("query"),
        name: t.string,
    }),
    KnownQueryObject
]);

const KnownCookieObject = t.intersection([
    t.partial({
        style: t.literal("form")
    }),
    BaseParameterObject
]);

const CookieObject = t.intersection([
    t.type({
        in: t.literal("cookie"),
        name: t.string,
    }),
    KnownCookieObject
]);

export const ParameterObject = t.union([CookieObject, QueryObject, PathObject, HeaderObject]);
export type ParameterObject = t.TypeOf<typeof ParameterObject>;