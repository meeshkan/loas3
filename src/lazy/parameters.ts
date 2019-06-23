import {
  $LazyParams,
  $Reference,
  $Parameter,
  is$LazyLazyParams,
  is$LazyParams,
  is$Parameter,
  is$Schema
} from "../generated/lazy";
import { Parameter, Reference } from "../generated/full";
import { _lazylazy, _lazy } from "./parameter";
import _mediaType from "./mediaType";
import _schema from "./schema";

export default (
  o:
    | $LazyParams
    | Record<string, Record<string, string | number | boolean>>
    | ($Reference | $Parameter)[]
): (Reference | Parameter)[] =>
  is$LazyLazyParams(o)
    ? _lazylazy(o)
    : is$LazyParams(o)
    ? _lazy(o)
    : o.filter(is$Parameter).map(({ schema, content, ...rest }) => ({
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
      }));
