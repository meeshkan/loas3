import { $ContentObject } from "../model/LazyOpenApi";
import { ContentObject } from "openapi3-ts";
import mediaType from "./mediaType";

// adds query, header, path, cookie to spec
const OAPI30_REQUEST_BODY_KEYS = new Set([
  "description",
  "required",
  "content"
]);
export default (o: $ContentObject): ContentObject =>
  typeof o !== "object" ||
  Object.keys(o as object).filter(a => a.indexOf("/") !== -1).length === 0
    ? {
        ["application/json"]: mediaType(o)
      }
    : Object.entries(o as ContentObject)
        .map(([a, b]) => ({ [a]: mediaType(b) }))
        .reduce((a, b) => ({ ...a, ...b }), {});
