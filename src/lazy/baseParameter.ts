import { $BaseParameterObject, $SchemaObject } from "../model/LazyOpenApi";
import { BaseParameterObject } from "../model/OpenApi";
import schema from "./schema";

// adds query, header, path, cookie to spec
export const OAPI30_BASE_PARAMETER_ITEM_KEYS = new Set(["description", "required", "deprecated",
"allowEmptyValue", "style", "explode", "allowReserved", "schema", "examples",
"example", "content"]);
export default (o: $BaseParameterObject): BaseParameterObject =>
  (typeof o !== "object" || Object.keys(o as object).filter(a => OAPI30_BASE_PARAMETER_ITEM_KEYS.has(a)).length === 0) ?
  {
    schema: schema(o),
  } :
  {
    ...o,
    schema: schema((o as BaseParameterObject).schema as $SchemaObject),
  } as BaseParameterObject;