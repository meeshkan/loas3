import t from "io-ts";
import { ServerObject } from "./server";
import { SpecificationExtension } from "./specification-extension";
import { ReferenceObject } from "./reference";

const BaseLink = t.intersection([
    t.partial({
        parameters: t.record(t.string, t.any),
        requestBody: t.any,
        description: t.any,
        server: ServerObject
    }),
    SpecificationExtension
]);

const OperationRefObject = t.intersection([
   BaseLink,
   t.type({
       operationRef: t.string,
   })
]);
type OperationRefObject = t.TypeOf<typeof OperationRefObject>;

const OperationIdObject = t.intersection([
    BaseLink,
    t.type({
        operationId: t.string,
    })
]);

type OperationIdObject = t.TypeOf<typeof OperationIdObject>;

export const LinkObject = t.union([OperationIdObject, OperationRefObject, ReferenceObject]);
export type LinkObject = t.TypeOf<typeof LinkObject>;

export const LinksObject = t.record(t.string, LinkObject);
export type LinksObject = t.TypeOf<typeof LinksObject>;