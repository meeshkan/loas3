import t from "io-ts";

export const ExternalDocumentObject = t.intersection([
  t.type({
    url: t.string
  }),
  t.partial({
    description: t.string
  })
]);
export type ExternalDocumentObject = t.TypeOf<typeof ExternalDocumentObject>;
