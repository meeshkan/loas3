import { $OpenAPIObject } from "../model/LazyOpenApi";
import { OpenAPIObject, SchemaObject } from "openapi3-ts";
import _info from "./info";
import _paths from "./paths";
import schema from "./schema";
import { isReference } from "./reference";

const schemize = (o: unknown) =>
  typeof o === "object" && isReference(<any>o) ? o : schema(<any>o);

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
  paths: _paths(paths),
  ...(components
    ? {
        components: {
          ...components,
          ...(components.schemas
            ? {
                schemas: Object.entries(components.schemas)
                  .map(([a, b]) => ({ [a]: schemize(b) as SchemaObject })) // ugh, can be ref too :-(
                  .reduce((a, b) => ({ ...a, ...b }), {})
              }
            : {})
        }
      }
    : {})
});
