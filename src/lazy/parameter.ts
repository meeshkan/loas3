import { $ParameterObject, $SchemaObject } from "../model/LazyOpenApi";
import { ParameterObject, ParameterLocation } from "../model/OpenApi";
import { OAPI30_BASE_PARAMETER_ITEM_KEYS } from "./baseParameter";
import schema from "./schema";

// adds query, header, path, cookie to spec
const OAPI30_PARAMETER_ITEM_KEYS = new Set([
  "name",
  "in",
  ...OAPI30_BASE_PARAMETER_ITEM_KEYS
]);
export default (
  o: $ParameterObject,
  path: string,
  specs?: { name: string; $in?: string }
): ParameterObject =>
  (typeof o !== "object" ||
    Object.keys(o as object).filter(a => OAPI30_PARAMETER_ITEM_KEYS.has(a))
      .length === 0) &&
  specs
    ? {
        name: specs.name,
        in: (specs.$in
          ? specs.$in
          : path.indexOf(`{${specs.name}}`) !== -1
          ? "path"
          : "query") as ParameterLocation,
        schema: schema(o)
      }
    : ({
        ...(o as ParameterObject),
        schema: schema((o as ParameterObject).schema as $SchemaObject)
      } as ParameterObject);
