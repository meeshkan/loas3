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
  Object.keys(<object>o).filter(a => OAPI30_OPERATION_ITEM_KEYS.has(a))
    .length === 0
    ? { responses: _responses(o) }
    : {
        ...o,
        ...{
          responses: _responses(<$ResponsesObject>(
            (<OperationObject>o).responses
          ))
        },
        ...(o && (<OperationObject>o).parameters
          ? { parameters: _parameters((<any>o).parameters, path) }
          : {}),
        ...(o && (<OperationObject>o).requestBody
          ? { requestBody: _requestBody((<any>o).requestBody) }
          : {})
      };
