import { $MediaTypeObject, $SchemaObject } from "../model/LazyOpenApi";
import { MediaTypeObject } from "openapi3-ts";
import schema from "./schema";

// adds query, header, path, cookie to spec
const OAPI30_MEDIA_TYPE_KEYS = new Set([
  "schema",
  "examples",
  "example",
  "encoding"
]);
export default (o: $MediaTypeObject): MediaTypeObject =>
  typeof o !== "object" ||
  Object.keys(o as object).filter(a => OAPI30_MEDIA_TYPE_KEYS.has(a)).length ===
    0
    ? {
        schema: schema(o)
      }
    : ({
        ...o,
        schema: schema((o as MediaTypeObject).schema as $SchemaObject)
      } as MediaTypeObject);
