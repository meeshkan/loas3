import { $BaseParameterObject, $SchemaObject } from "../model/LazyOpenApi";
import { BaseParameterObject } from "openapi3-ts";
import schema from "./schema";

// adds query, header, path, cookie to spec
export const OAPI30_BASE_PARAMETER_ITEM_KEYS = new Set([
  "description",
  "required",
  "deprecated",
  "allowEmptyValue",
  "style",
  "explode",
  "allowReserved",
  "schema",
  "examples",
  "example",
  "content"
]);
export default (o: $BaseParameterObject): BaseParameterObject =>
  typeof o !== "object" ||
  Object.keys(<object>o).filter(a => OAPI30_BASE_PARAMETER_ITEM_KEYS.has(a))
    .length === 0
    ? {
        schema: schema(o)
      }
    : <BaseParameterObject>{
        ...o,
        schema: schema(<$SchemaObject>(<BaseParameterObject>o).schema)
      };
