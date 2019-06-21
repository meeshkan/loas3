import { $ParameterObject, $SchemaObject } from "../model/LazyOpenApi";
import { ParameterObject, ParameterLocation } from "openapi3-ts";
import { OAPI30_BASE_PARAMETER_ITEM_KEYS } from "./baseParameter";
import schema, { isTopLevelSchema } from "./schema";
import { isReference } from "./reference";

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
    Object.keys(<object>o).filter(a => OAPI30_PARAMETER_ITEM_KEYS.has(a))
      .length === 0) &&
  specs
    ? {
        name: specs.name,
        in: <ParameterLocation>(
          (specs.$in
            ? specs.$in
            : path.indexOf(`{${specs.name}}`) !== -1
            ? "path"
            : "query")
        ),
        schema: schema(o)
      }
    : <ParameterObject>{
        ...(<ParameterObject>o),
        schema: isTopLevelSchema((<ParameterObject>o).schema)
          ? (<ParameterObject>o).schema
          : isReference((<any>o).schema)
          ? { schema: (<any>o).schema }
          : schema(<$SchemaObject>(<ParameterObject>o).schema)
      };
