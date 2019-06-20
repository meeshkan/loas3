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
  Object.keys(o as object).filter(k => OAPI30_RESPONSE_KEYS.has(k)).length === 0
    ? {
        description: "too lazy",
        content: content(o)
      }
    : // todo: links
      {
        ...(o as ResponseObject),
        ...((o as ResponseObject).content
          ? {
              content: content((o as ResponseObject).content as $ContentObject)
            }
          : {}),
        ...((o as ResponseObject).headers
          ? {
              headers: Object.entries((o as ResponseObject).headers as object)
                .map(([k, v]) => ({ [k]: baseParameter(v) }))
                .reduce((a, b) => ({ ...a, ...b }), {})
            }
          : {})
      };
