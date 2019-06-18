import { _is, _type } from "./util";

export const isExternalDocumentObject = _is<ExternalDocumentObject>(
  { url: "string" },
  { description: "string" }
);
export type ExternalDocumentObject = { url: string; description?: string };
export const ExternalDocumentObject = _type<ExternalDocumentObject>(
  "ExternalDocumentObject",
  isExternalDocumentObject
);
