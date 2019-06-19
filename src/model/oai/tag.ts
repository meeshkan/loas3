import { ExternalDocumentObject } from "./external-document";
import { _is, _type, _choose } from "./util";

const isTagObject = _is<TagObject>(
  {
    name: "string"
  },
  {
    description: "string",
    externalDocs: _choose([ExternalDocumentObject])
  }
);

export type TagObject = {
  name: string;
  description?: string;
  externalDocs?: ExternalDocumentObject;
};

export const TagObject = _type("TagObject", isTagObject);
