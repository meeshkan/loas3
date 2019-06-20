import { $ContentObject } from "../model/LazyOpenApi";
import { ContentObject } from "openapi3-ts";
import mediaType from "./mediaType";

export default (o: $ContentObject): ContentObject =>
  typeof o !== "object" ||
  Object.keys(<object>o).filter(a => a.indexOf("/") !== -1).length === 0
    ? {
        ["application/json"]: mediaType(o)
      }
    : Object.entries(<ContentObject>o)
        .map(([a, b]) => ({ [a]: mediaType(b) }))
        .reduce((a, b) => ({ ...a, ...b }), {});
