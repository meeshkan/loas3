import {
  $OpenAPIObject,
  $Components,
  is$Schema,
  is$Header,
  is$RequestBody,
  is$Response,
  is$Parameter
} from "../generated/lazy";
import { OpenAPIObject, Schema, Components } from "../generated/full";
import _info from "./info";
import _paths from "./paths";
import _schema from "./schema";
import _header from "./header";
import _requestBody from "./requestBody";
import _response from "./response";
import { _parameter } from "./parameters";

const _components = ({
  responses,
  parameters,
  examples,
  schemas,
  requestBodies,
  headers,
  securitySchemes,
  links
}: $Components): Components => ({
  ...(securitySchemes ? { securitySchemes } : {}),
  ...(links ? { links } : {}),
  ...(examples ? { examples } : {}),
  ...(responses
    ? {
        responses: Object.entries(responses)
          .map(([a, b]) => ({ [a]: is$Response(b) ? _response(b) : b }))
          .reduce((a, b) => ({ ...a, ...b }), {})
      }
    : {}),
  ...(parameters
    ? {
        parameters: Object.entries(parameters)
          .map(([a, b]) => ({ [a]: is$Parameter(b) ? _parameter(b) : b }))
          .reduce((a, b) => ({ ...a, ...b }), {})
      }
    : {}),
  ...(requestBodies
    ? {
        requestBodies: Object.entries(requestBodies)
          .map(([a, b]) => ({ [a]: is$RequestBody(b) ? _requestBody(b) : b }))
          .reduce((a, b) => ({ ...a, ...b }), {})
      }
    : {}),
  ...(headers
    ? {
        headers: Object.entries(headers)
          .map(([a, b]) => ({ [a]: is$Header(b) ? _header(b) : b }))
          .reduce((a, b) => ({ ...a, ...b }), {})
      }
    : {}),
  ...(schemas
    ? {
        schemas: Object.entries(schemas)
          .map(([a, b]) => ({ [a]: is$Schema(b) ? _schema(b) : b }))
          .reduce((a, b) => ({ ...a, ...b }), {})
      }
    : {})
});

export default ({
  openapi,
  components,
  info,
  paths,
  ...rest
}: $OpenAPIObject = {}): OpenAPIObject => ({
  ...rest,
  ...(openapi ? { openapi } : { openapi: "3.0.0" }),
  info: _info(info),
  ...(paths ? { paths: _paths(paths) } : { paths: {} }),
  ...(components
    ? {
        components: _components(components)
      }
    : {})
});
