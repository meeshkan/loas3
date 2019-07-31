import {
  $Schema,
  is$SimpleBooleanSchema,
  is$SimpleIntegerSchema,
  is$SimpleNumberSchema,
  is$SimpleStringSchema,
  is$SimpleArraySchema,
  is$SimpleObjectSchema,
  is$$Schema,
  is$Reference,
  $$Schema,
} from "../generated/lazy";
import { Schema } from "../generated/full";

const __ = ({
  properties,
  additionalProperties,
  items,
  allOf,
  anyOf,
  oneOf,
  not,
  ...rest
}: $$Schema): Schema => ({
  ...rest,
  ...(properties
    ? {
        properties: Object.entries(properties)
          .map(([a, b]) => ({ [a]: is$Reference(b) ? b : _(b) }))
          .reduce((a, b) => ({ ...a, ...b }), {}),
      }
    : {}),
  ...(items
    ? {
        items: is$Reference(items) ? items : _(items),
      }
    : {}),
  ...(not
    ? {
        not: is$Reference(not) ? not : _(not),
      }
    : {}),
  ...(allOf
    ? {
        allOf: allOf.map(i => (is$Reference(i) ? i : _(i))),
      }
    : {}),
  ...(anyOf
    ? {
        anyOf: anyOf.map(i => (is$Reference(i) ? i : _(i))),
      }
    : {}),
  ...(oneOf
    ? {
        oneOf: oneOf.map(i => (is$Reference(i) ? i : _(i))),
      }
    : {}),
  ...(additionalProperties !== undefined
    ? {
        additionalProperties: is$Reference(additionalProperties)
          ? additionalProperties
          : typeof additionalProperties === "boolean"
          ? additionalProperties
          : _(additionalProperties),
      }
    : {}),
});

const un_x = (o: $Schema): $Schema =>
  Object.entries(o)
    .filter(([a]) => a.slice(0, 2) !== "x-")
    .map(([a, b]) => ({ [a]: b }))
    .reduce((a, b) => ({ ...a, ...b }), {});
const x = (o: $Schema): $Schema =>
  Object.entries(o)
    .filter(([a]) => a.slice(0, 2) === "x-")
    .map(([a, b]) => ({ [a]: b }))
    .reduce((a, b) => ({ ...a, ...b }), {});

const _ = (o: $Schema): Schema =>
  is$SimpleBooleanSchema(o)
    ? {
        type: "boolean",
        default: o,
        example: o,
      }
    : is$SimpleIntegerSchema(o)
    ? {
        type: "integer",
        format: "int64",
        default: o,
        example: o,
      }
    : is$SimpleNumberSchema(o)
    ? {
        type: "number",
        format: "double",
        default: o,
        example: o,
      }
    : is$SimpleStringSchema(o)
    ? {
        type: "string",
        default: o,
        example: o,
      }
    : is$SimpleArraySchema(o)
    ? {
        type: "array",
        ...(o.length > 0 ? { items: _(o[0]) } : {}),
        default: o,
        example: o,
      }
    : is$$Schema(o)
    ? __(o)
    : is$SimpleObjectSchema(o)
    ? {
        type: "object",
        properties: Object.entries(un_x(o))
          .map(([a, b]) => ({ [a]: _(b) }))
          .reduce((a, b) => ({ ...a, ...b }), {}),
        example: un_x(o),
        default: un_x(o),
        ...x(o),
      }
    : {};

export default _;
