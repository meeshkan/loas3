import { JSONValue } from "../model/LazyOpenApi";
import { SchemaObject, ReferenceObject } from "openapi3-ts";
import { isReference } from "./reference";

// only the necessary to establish - this can even theoretically be shorter
const SCHEMA_PROPERTIES = new Set([
  "properties",
  "type",
  "additionalProperties",
  "xml"
]);

export const isTopLevelSchema = (o: unknown): o is SchemaObject =>
  o &&
  typeof o === "object" &&
  Object.keys(<object>o).filter(i => SCHEMA_PROPERTIES.has(i)).length > 0;

const __ = (o: JSONValue): SchemaObject | ReferenceObject =>
  o instanceof Array
    ? {
        type: "array",
        items: o.length !== 0 ? __(o[0]) : { type: "string" } //defaults to string
      }
    : typeof o === "object"
    ? {
        type: "object",
        ...(Object.keys(<object>o).length !== 0
          ? {
              properties: Object.entries(<object>o)
                .map(([k, v]) => ({ [k]: __(v) }))
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
const _ = (o: JSONValue): SchemaObject | ReferenceObject =>
  isReference(o)
    ? o
    : typeof o === "object" && Object.keys(<object>o).indexOf("oneOf") !== -1
    ? { ...o, oneOf: (<any>o).oneOf.map((i: any) => _(i)) }
    : typeof o === "object" && Object.keys(<object>o).indexOf("allOf") !== -1
    ? { ...o, allOf: (<any>o).allOf.map((i: any) => _(i)) }
    : typeof o === "object" && Object.keys(<object>o).indexOf("anyOf") !== -1
    ? { ...o, anyOf: (<any>o).anyOf.map((i: any) => _(i)) }
    : typeof o === "object" && Object.keys(<object>o).indexOf("not") !== -1
    ? { ...o, not: _((<any>o).not) }
    : isTopLevelSchema(o) && o.properties
    ? {
        ...o,
        properties: Object.entries(o.properties)
          .map(([a, b]) => ({ [a]: _(b as JSONValue) }))
          .reduce((a, b) => ({ ...a, ...b }), {})
      }
    : isTopLevelSchema(o) && o.type === "array"
    ? { ...o, items: _(o.items as JSONValue) }
    : isTopLevelSchema(o)
    ? o
    : __(o);

export default _;
