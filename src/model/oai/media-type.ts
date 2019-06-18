import t from "io-ts";
import { SpecificationExtension } from "./specification-extension";
import { SchemaObject } from "./schema";
import { ExamplesObject } from "./examples";
import { EncodingObject } from "./encoding";
import { ReferenceObject } from "./reference";

export const MediaTypeObject = t.intersection([
    t.type({
        schema: SchemaObject,
    }),
    t.partial({
        example: t.any,
        examples: t.union([ExamplesObject, t.string, ReferenceObject]),
        encoding: t.record(t.string, EncodingObject)
    }),
    SpecificationExtension,
]);

export type MediaTypeObject = t.TypeOf<typeof MediaTypeObject>;