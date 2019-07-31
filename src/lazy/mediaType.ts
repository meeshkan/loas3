import {
  $MediaType,
  is$$MediaType,
  is$Reference,
  $$MediaType,
} from "../generated/lazy";
import _encoding from "./encoding";
import { MediaType } from "../generated/full";
import _schema from "./schema";

const __ = ({ encoding, schema, ...rest }: $$MediaType) => ({
  ...rest,
  ...(encoding
    ? {
        encoding: Object.entries(encoding)
          .map(([a, b]) => ({ [a]: _encoding(b) }))
          .reduce((a, b) => ({ ...a, ...b }), {}),
      }
    : {}),
  ...(schema
    ? {
        schema: is$Reference(schema) ? schema : _schema(schema),
      }
    : {}),
});

export default (o: $MediaType): MediaType =>
  is$$MediaType(o)
    ? __(o)
    : is$Reference(o)
    ? { schema: o }
    : { schema: _schema(o) };
