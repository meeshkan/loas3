import t from "io-ts";
import { ParameterObject } from "./parameter";
import { ExternalDocumentObject } from "./external-document";
import { ReferenceObject } from "./reference";
import { RequestBodyObject } from "./requestBody";
import { SecurityRequirementObject } from "./security-requirements";
import { ServerObject } from "./server";
import { ResponsesObject } from "./response";
import { _is, _type, _choose } from "./util";

// TODO: implement recursive def for callbacks
const isOperationObject = _is<OperationObject>(
  {
    responses: _choose([ResponsesObject])
  },
  {
    tags: v =>
      v instanceof Array &&
      v.map(i => typeof i === "string").reduce((a, b) => a && b, true),
    summary: "string",
    description: "string",
    externalDocs: _choose([ExternalDocumentObject]),
    operationId: "string",
    parameters: v =>
      v &&
      ((v instanceof Array &&
        v.map(i => ParameterObject.is(i)).reduce((a, b) => a && b, true)) ||
        _choose([ReferenceObject])(v)),
    requestBody: _choose([RequestBodyObject]),
    deprecated: "boolean",
    servers: v =>
      v &&
      v instanceof Array &&
      v.map(i => ServerObject.is(i)).reduce((a, b) => a && b, true),
    security: v =>
      v &&
      v instanceof Array &&
      v.map(i => SecurityRequirementObject.is(i)).reduce((a, b) => a && b, true)
  }
);

export type OperationObject = {
  responses: ResponsesObject;
  tags: string[];
  summary: string;
  description: string;
  externalDocs: ExternalDocumentObject;
  operationId: string;
  parameters: ParameterObject[] | ReferenceObject;
  requestBody: RequestBodyObject;
  deprecated: boolean;
  servers: ServerObject[];
  security: SecurityRequirementObject[];
};

export const OperationObject = _type<OperationObject>(
  "OperationObject",
  isOperationObject
);
