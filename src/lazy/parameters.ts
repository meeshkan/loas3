import {
  $LazyParams,
  $Reference,
  $Parameter,
  is$LazyLazyParams,
  is$LazyParams,
  is$Parameter,
  is$Schema,
  $Schema,
  $LazyLazyParams
} from "../generated/lazy";
import { Parameter, Reference } from "../generated/full";
import { _lazylazy, _lazy } from "./parameter";
import _mediaType from "./mediaType";
import _schema from "./schema";

const __ = ({ schema, content, ...rest }: $Parameter) => ({
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
        schema: is$Schema(schema) ? _schema(schema) : schema
      }
    : {})
});

export default (
  o: $LazyParams | $LazyLazyParams | ($Reference | $Parameter)[],
  path: string
): (Reference | Parameter)[] =>
  is$LazyLazyParams(o)
    ? _lazylazy(o, path)
    : is$LazyParams(o)
    ? _lazy(o)
    : o.map(i => (is$Parameter(i) ? __(i) : i));
