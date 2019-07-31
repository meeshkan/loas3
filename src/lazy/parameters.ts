import {
  $LazyParams,
  $Reference,
  $Parameter,
  is$LazyLazyParams,
  is$LazyParams,
  $LazyLazyParams,
  is$Reference
} from "../generated/lazy";
import { Parameter, Reference } from "../generated/full";
import { _lazylazy, _lazy } from "./parameter";
import _mediaType from "./mediaType";
import _schema from "./schema";

export const _parameter = ({ schema, content, ...rest }: $Parameter) => ({
  ...rest,
  ...(content
    ? {
        content: Object.entries(content)
          .map(([a, b]) => ({ [a]: _mediaType(b) }))
          .reduce((a, b) => ({ ...a, ...b }), {})
      }
    : {}),
  ...(schema
    ? {
        schema: is$Reference(schema) ? schema : _schema(schema)
      }
    : {})
});

export default (
  o: $LazyParams | $LazyLazyParams | ($Reference | $Parameter)[],
  path: string
): (Reference | Parameter)[] =>
  o instanceof Array
    ? o.map(i => (is$Reference(i) ? i : _parameter(i))) // this has to come first because _lazy is a catch-all
    : is$LazyLazyParams(o)
    ? _lazylazy(o, path)
    : is$LazyParams(o)
    ? _lazy(o)
    : []; // should never reach this
