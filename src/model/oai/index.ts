import t from "io-ts";
import { InfoObject } from "./info";
import { PathsObject } from "./path";
import { ServerObject } from "./server";
import { ComponentsObject } from "./components";
import { SecurityRequirementObject } from "./security-requirements";
import { TagObject } from "./tag";
import { ExternalDocumentObject } from "./external-document";

export const OpenAPIObject = t.intersection([
  t.type({
    openapi: t.string,
    info: InfoObject,
    paths: PathsObject
  }),
  t.partial({
    components: ComponentsObject,
    security: t.array(SecurityRequirementObject),
    tags: t.array(TagObject),
    externalDocs: ExternalDocumentObject
  })
]);
export type OpenAPIObject = t.TypeOf<typeof OpenAPIObject>;
