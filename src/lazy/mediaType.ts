import { $MediaTypeObject, $SchemaObject } from "../model/LazyOpenApi";
import { MediaTypeObject, ReferenceObject } from "openapi3-ts";
import schema from "./schema";

const OAPI30_MEDIA_TYPE_KEYS = new Set([
  "schema",
  "examples",
  "example",
  "encoding"
]);
export default (o: $MediaTypeObject): MediaTypeObject =>
  typeof o !== "object" || // if $SchemaObject
  Object.keys(<object>o).filter(a => OAPI30_MEDIA_TYPE_KEYS.has(a)).length === 0
    ? {
        schema: schema(o)
      }
    : Object.keys(<object>o).indexOf("$ref") !== -1
    ? { schema: <ReferenceObject>o }
    : <MediaTypeObject>{
        // then it is $MediaTypeObject and maybe the next thing down
        ...o,
        schema: schema(<$SchemaObject>(<MediaTypeObject>o).schema)
      };
