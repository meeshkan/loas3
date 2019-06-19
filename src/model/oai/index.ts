import t from "io-ts";
import { InfoObject } from "./info";
import { PathsObject } from "./path";
import { ComponentsObject } from "./components";
import { SecurityRequirementObject } from "./security-requirements";
import { TagObject } from "./tag";
import { ExternalDocumentObject } from "./external-document";
import { _is, _type, _choose } from "./util";
import { ServerObject } from "./server";

// TODO: callbacks
export const isOpenAPIObject = _is<OpenAPIObject>(
  {
    openapi: "string",
    info: v => v && typeof v === "object" && InfoObject.is(v),
    paths: v => v && typeof v === "object" && PathsObject.is(v)
  },
  {
    components: v => v && typeof v === "object" && ComponentsObject.is(v),
    security: v =>
      v &&
      v instanceof Array &&
      v
        .map(i => SecurityRequirementObject.is(i))
        .reduce((a, b) => a && b, true),
    servers: v =>
      v &&
      v instanceof Array &&
      v.map(i => ServerObject.is(i)).reduce((a, b) => a && b, true),
    tags: v =>
      v &&
      v instanceof Array &&
      v.map(i => TagObject.is(i)).reduce((a, b) => a && b, true),
    externalDocs: v =>
      v && typeof v === "object" && ExternalDocumentObject.is(v)
  }
);
export type OpenAPIObject = {
  openapi: string;
  info: InfoObject;
  paths: PathsObject;
  servers?: ServerObject[];
  components?: ComponentsObject;
  security?: SecurityRequirementObject[];
  tags?: TagObject[];
  externalDocs?: ExternalDocumentObject;
};
export const OpenAPIObject = _type<OpenAPIObject>(
  "OpenAPIObject",
  isOpenAPIObject
);
