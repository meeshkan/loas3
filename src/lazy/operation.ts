import {
  $Operation,
  is$$Operation,
  $$Operation,
  is$RequestBody,
  is$Reference
} from "../generated/lazy";
import { Operation } from "../generated/full";
import _responses from "./responses";
import _parameters from "./parameters";
import _requestBody from "./requestBody";
import _path from "./path";

const __ = (
  { responses, parameters, requestBody, callbacks, ...rest }: $$Operation,
  path: string
): Operation => ({
  ...rest,
  ...(callbacks
    ? {
        callbacks: Object.entries(callbacks)
          .map(([a, b]) => ({
            [a]: is$Reference(b)
              ? b
              : Object.entries(b)
                  .map(([c, d]) => ({ [c]: _path(d, c) }))
                  .reduce((c, d) => ({ ...c, ...d }), {})
          }))
          .reduce((a, b) => ({ ...a, ...b }), {})
      }
    : {}),
  responses: _responses(responses),
  ...(requestBody
    ? {
        requestBody: is$RequestBody(requestBody)
          ? _requestBody(requestBody)
          : requestBody
      }
    : {}),
  ...(parameters ? { parameters: _parameters(parameters, path) } : {})
});

export default (o: $Operation, path: string): Operation =>
  is$$Operation(o) ? __(o, path) : { responses: _responses(o) };
