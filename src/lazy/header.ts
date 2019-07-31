import { $Header, is$Schema, is$Reference } from "../generated/lazy";
import { Header } from "../generated/full";
import _schema from "./schema";
import _mediaType from "./mediaType";

export default ({ content, schema, ...rest }: $Header): Header => ({
  ...rest,
  ...(content
    ? {
        content: Object.entries(content)
          .map(([a, b]) => ({ [a]: _mediaType(b) }))
          .reduce((a, b) => ({ ...a, ...b }), {}),
      }
    : {}),
  ...(schema
    ? { schema: is$Reference(schema) ? schema : _schema(schema) }
    : {}),
});
