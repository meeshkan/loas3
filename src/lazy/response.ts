import { $ResponseObject, $ContentObject } from "../model/LazyOpenApi";
import { ResponseObject } from "openapi3-ts";
import baseParameter from "./baseParameter";
import content from "./content";

const OAPI30_RESPONSE_KEYS = new Set([
  "description",
  "headers",
  "content",
  "links"
]);

export default (o: $ResponseObject): ResponseObject =>
  typeof o !== "object" ||
  Object.keys(<object>o).filter(k => OAPI30_RESPONSE_KEYS.has(k)).length === 0
    ? {
        description: "too lazy",
        content: content(o)
      }
    : // todo: links
      {
        ...(<ResponseObject>o),
        ...((<ResponseObject>o).content
          ? {
              content: content(<$ContentObject>(<ResponseObject>o).content)
            }
          : {}),
        ...((<ResponseObject>o).headers
          ? {
              headers: Object.entries(<object>(<ResponseObject>o).headers)
                .map(([k, v]) => ({ [k]: baseParameter(v) }))
                .reduce((a, b) => ({ ...a, ...b }), {})
            }
          : {})
      };
