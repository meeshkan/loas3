import {
  $Response,
  is$$Response,
  $$Response,
  is$Header,
  is$MediaType
} from "../generated/lazy";
import { Response } from "../generated/full";
import _mediaType from "./mediaType";
import _header from "./header";

const __ = ({
  description,
  content,
  headers,
  ...rest
}: $$Response): Response => ({
  ...rest,
  description,
  ...(headers
    ? {
        headers: Object.entries(headers)
          .map(([a, b]) => ({ [a]: is$Header(b) ? _header(b) : b }))
          .reduce((a, b) => ({ ...a, ...b }), {})
      }
    : {}),
  ...(content
    ? {
        content: Object.entries(content)
          .map(([a, b]) => ({ [a]: _mediaType(b) }))
          .reduce((a, b) => ({ ...a, ...b }), {})
      }
    : {})
});

export default (o: $Response): Response =>
  is$$Response(o)
    ? __(o)
    : {
        description: "too lazy",
        content: { "application/json": _mediaType(o) }
      };
