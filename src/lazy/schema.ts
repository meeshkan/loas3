import { JSONValue } from "../model/LazyOpenApi";
import { SchemaObject } from "../model/OpenApi";

const _ = (o: JSONValue): SchemaObject =>
  o instanceof Array
    ? {
        type: "array",
        items: o.length !== 0 ? _(o[0]) : { type: "string" } //defaults to string
      }
    : typeof o === "object"
    ? {
        type: "object",
        ...(Object.keys(o as object).length !== 0
          ? {
              properties: Object.entries(o as object)
                .map(([k, v]) => ({ [k]: _(v) }))
                .reduce((a, b) => ({ ...a, ...b }), {})
            }
          : {})
      }
    : {
        default: o,
        ...(typeof o === "number" && Math.floor(o) === o
          ? { format: "int64" }
          : typeof o === "number"
          ? { format: "double" }
          : {}),
        type:
          typeof o === "number" && Math.floor(o) === o
            ? "integer"
            : typeof o === "number"
            ? "number"
            : typeof o === "boolean"
            ? "boolean"
            : o === null
            ? "null"
            : "string"
      };

export default _;
