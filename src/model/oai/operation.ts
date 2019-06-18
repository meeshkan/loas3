import t from "io-ts";
import { ParameterObject } from "./parameter";
import { SpecificationExtension } from "./specification-extension";
import { ExternalDocumentObject } from "./external-document";
import { ReferenceObject } from "./reference";
import { RequestBodyObject } from "./requestBody";
import { SecurityRequirementObject } from "./security-requirements";
import { ServerObject } from "./server";
import { ResponsesObject } from "./response";

// TODO: implement recursive def for callbacks
export const OperationObject = t.intersection([
  t.type({
    responses: ResponsesObject
  }),
  t.partial({
    tags: t.array(t.string),
    summary: t.string,
    description: t.string,
    externalDocs: ExternalDocumentObject,
    operationId: t.string,
    parameters: t.union([t.array(ParameterObject), ReferenceObject]),
    requestBody: RequestBodyObject,
    deprecated: t.boolean,
    servers: t.array(ServerObject),
    security: t.array(SecurityRequirementObject)
  }),
  SpecificationExtension
]);
