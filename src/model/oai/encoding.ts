import t from "io-ts";
import { SpecificationExtension } from "./specification-extension";
import { KnownHeaderObject } from "./parameter";
import { ReferenceObject } from "./reference";

export const EncodingObject = t.intersection([
    t.partial({
        contentType: t.string,
        headers: t.record(t.string, t.union([KnownHeaderObject, ReferenceObject])),
        style: t.string,
        explode: t.boolean,
        allowReserved: t.boolean,
    }),
    SpecificationExtension
]);

export type EncodingObject = t.TypeOf<typeof EncodingObject>;