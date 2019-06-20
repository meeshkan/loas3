import { $ResponsesObject } from "../model/LazyOpenApi";
import { ResponsesObject } from "openapi3-ts";
import response from "./response";

const OAPI30_STATUS_CODES = new Set([
  "default",
  ...new Array(400).fill(null).map((_, j) => `${100 + j}`)
]);

export default (o: $ResponsesObject): ResponsesObject =>
  typeof o !== "object" ||
  Object.keys(<object>o).filter(k => OAPI30_STATUS_CODES.has(k)).length === 0
    ? { default: response(o) }
    : Object.entries(<object>o)
        .map(([a, b]) => ({ [a]: response(b) }))
        .reduce((a, b) => ({ ...a, ...b }));
