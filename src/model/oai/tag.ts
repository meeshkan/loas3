import t from "io-ts";
import { ExternalDocumentObject } from "./external-document";
import { SpecificationExtension } from "./specification-extension";

export const TagObject = t.intersection([
  t.type({
    name: t.string
  }),
  t.partial({
    description: t.string,
    externalDocs: ExternalDocumentObject
  }),
  SpecificationExtension
]);

export type TagObject = t.TypeOf<typeof TagObject>;
