import { $OpenAPIObject } from "../model/LazyOpenApi";
import { OpenAPIObject } from "../model/OpenApi";
import _info from "./info";
import _paths from "./paths";

export default ({
  openapi,
  info,
  paths,
  ...rest
}: $OpenAPIObject = {}): OpenAPIObject => ({
  ...rest,
  ...(openapi ? { openapi } : { openapi: "3.0.0" }),
  ...{ info: _info(info) },
  ...{ paths: _paths(paths) }
});
