import {
  $Schema,
  is$IntegerSchema,
  is$SimpleBooleanSchema,
  is$SimpleIntegerSchema,
  is$SimpleNumberSchema,
  is$SimpleStringSchema,
  is$SimpleArraySchema,
  is$SimpleObjectSchema,
  is$NumberEnumSchema,
  is$NumberSchema,
  is$StringSchema,
  is$IntegerEnumSchema,
  is$StringEnumSchema,
  is$ArraySchema,
  $ArraySchema,
  is$ObjectSchema,
  $ObjectSchema,
  is$AnyOfSchema,
  $AnyOfSchema,
  $AllOfSchema,
  $OneOfSchema,
  $NotSchema,
  is$AllOfSchema,
  is$OneOfSchema,
  is$NotSchema,
  is$Reference
} from "../generated/lazy";
import { Schema } from "../generated/full";

const _array = ({ items, ...rest }: $ArraySchema): Schema => ({
  ...rest,
  ...(items ? { items: is$Reference(items) ? items : _(items) } : {})
});

const _object = ({
  properties,
  additionalProperties,
  ...rest
}: $ObjectSchema): Schema => ({
  ...rest,
  properties: Object.entries(properties)
    .map(([a, b]) => ({ [a]: is$Reference(b) ? b : _(b) }))
    .reduce((a, b) => ({ ...a, ...b }), {}),
  ...(additionalProperties
    ? {
        additionalProperties: is$Reference(additionalProperties)
          ? additionalProperties
          : _(additionalProperties)
      }
    : {})
});

const _anyOf = ({ anyOf, ...rest }: $AnyOfSchema): Schema => ({
  ...rest,
  ...(anyOf ? { anyOf: anyOf.map(i => (is$Reference(i) ? i : _(i))) } : {})
});

const _allOf = ({ allOf, ...rest }: $AllOfSchema): Schema => ({
  ...rest,
  ...(allOf ? { allOf: allOf.map(i => (is$Reference(i) ? i : _(i))) } : {})
});

const _oneOf = ({ oneOf, ...rest }: $OneOfSchema): Schema => ({
  ...rest,
  ...(oneOf ? { oneOf: oneOf.map(i => (is$Reference(i) ? i : _(i))) } : {})
});

const _not = ({ not, ...rest }: $NotSchema): Schema => ({
  ...rest,
  ...(not ? { not: is$Reference(not) ? not : _(not) } : {})
});

const _ = (o: $Schema): Schema =>
  is$SimpleBooleanSchema(o)
    ? {
        type: "boolean",
        default: o
      }
    : is$SimpleIntegerSchema(o)
    ? {
        type: "integer",
        format: "int64",
        default: o,
        example: o
      }
    : is$SimpleNumberSchema(o)
    ? {
        type: "number",
        format: "double",
        default: o,
        example: o
      }
    : is$SimpleStringSchema(o)
    ? {
        type: "string",
        default: o,
        example: o
      }
    : is$SimpleArraySchema(o)
    ? {
        type: "array",
        ...(o.length > 0 ? { items: _(o[0]) } : {}),
        default: o,
        example: o
      }
    : is$IntegerSchema(o)
    ? o
    : is$NumberSchema(o)
    ? o
    : is$StringSchema(o)
    ? o
    : is$IntegerEnumSchema(o)
    ? o
    : is$NumberEnumSchema(o)
    ? o
    : is$StringEnumSchema(o)
    ? o
    : is$ArraySchema(o)
    ? _array(o)
    : is$ObjectSchema(o)
    ? _object(o)
    : is$AnyOfSchema(o)
    ? _anyOf(o)
    : is$AllOfSchema(o)
    ? _allOf(o)
    : is$OneOfSchema(o)
    ? _oneOf(o)
    : is$NotSchema(o)
    ? _not(o)
    : is$SimpleObjectSchema(o)
    ? {
        type: "object",
        properties: Object.entries(o)
          .map(([a, b]) => ({ [a]: _(b) }))
          .reduce((a, b) => ({ ...a, ...b }), {}),
        example: o,
        default: o
      }
    : {}

export default _;
