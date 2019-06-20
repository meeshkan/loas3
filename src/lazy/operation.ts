import { $OperationObject, $ResponsesObject } from "../model/LazyOpenApi";
import { OperationObject } from "openapi3-ts";
import _parameters from "./parameters";
import _requestBody from "./requestBody";
import _responses from "./responses";

const OAPI30_OPERATION_ITEM_KEYS = new Set([
  "$ref",
  "tags",
  "summary",
  "description",
  "externalDocs",
  "operationId",
  "parameters",
  "requestBody",
  "responses",
  "callbacks",
  "deprecated",
  "security",
  "servers"
]);

export default (o: $OperationObject, path: string): OperationObject =>
  typeof o !== "object" ||
  Object.keys(o as object).filter(a => OAPI30_OPERATION_ITEM_KEYS.has(a))
    .length === 0
    ? { responses: _responses(o) }
    : {
        ...o,
        ...{
          responses: _responses((o as OperationObject)
            .responses as $ResponsesObject)
        },
        ...(o && (o as OperationObject).parameters
          ? { parameters: _parameters((o as any).parameters, path) }
          : {}),
        ...(o && (o as OperationObject).requestBody
          ? { requestBody: _requestBody((o as any).requestBody) }
          : {})
      };
