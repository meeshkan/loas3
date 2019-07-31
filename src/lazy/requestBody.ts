import {
  $RequestBody,
  is$$RequestBody,
  $$RequestBody,
} from "../generated/lazy";
import { RequestBody } from "../generated/full";
import _mediaType from "./mediaType";

const __ = ({ content, ...rest }: $$RequestBody): RequestBody => ({
  ...rest,
  content: Object.entries(content)
    .map(([a, b]) => ({ [a]: _mediaType(b) }))
    .reduce((a, b) => ({ ...a, ...b }), {}),
});

export default (o: $RequestBody): RequestBody =>
  is$$RequestBody(o)
    ? __(o)
    : {
        content: { "application/json": _mediaType(o) },
      };
