import * as t from "io-ts";
import {SpecificationExtension} from "./specification-extension";

export const XMLObject = t.intersection([
    t.partial({
        name: t.string,
        namespace: t.string,
        prefix: t.string,
        attribute: t.boolean,
        wrapped: t.boolean
    }),
    SpecificationExtension
]);
export type XMLObject = t.TypeOf<typeof XMLObject>;