import _content from "./content";
import { $Response, is$$Response, $$Response } from "../generated/lazy";
import { Response } from "../generated/full";
import _mediaType from "./mediaType";

const __ = ({
  description,
  content,
  headers,
  ...rest
}: $$Response): Response => ({
  ...rest,
  description,
  ...(headers
    ? Object.entries(headers) // same problem as encoding, need to unroll header :-(
        .map(([a, b]) => ({ [a]: b }))
        .reduce((a, b) => ({ ...a, ...b }), {})
    : {}),
  ...(content
    ? Object.entries(content)
        .map(([a, b]) => ({ [a]: _mediaType(b) }))
        .reduce((a, b) => ({ ...a, ...b }), {})
    : {})
});

export default (o: $Response): Response =>
  is$$Response(o)
    ? __(o)
    : {
        description: "too lazy",
        content: _content(o)
      };
