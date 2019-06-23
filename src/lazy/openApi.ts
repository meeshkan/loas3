import { $OpenAPIObject, is$Schema } from "../generated/lazy";
import { OpenAPIObject, Schema } from "../generated/full";
import _info from "./info";
import _paths from "./paths";
import _schema from "./schema";

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
        components: {
          ...components, // this is what screws up, figure out why
          ...(components.schemas
            ? {
                schemas: Object.entries(components.schemas)
                  .map(([a, b]) => ({ [a]: is$Schema(b) ? _schema(b) : b }))
                  .reduce((a, b) => ({ ...a, ...b }), {})
              }
            : {})
        }
      }
    : {})
});
