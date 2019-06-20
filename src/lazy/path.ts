import { $PathItemObject, $ParametersObject } from "../model/LazyOpenApi";
import { PathItemObject } from "openapi3-ts";
import operation from "./operation";
import parameters from "./parameters";

const OAPI30_METHODS = new Set([
  "$ref",
  "get",
  "put",
  "post",
  "delete",
  "options",
  "head",
  "patch",
  "trace"
]);
const OAPI30_PATH_ITEM_KEYS = new Set([
  "summary",
  "description",
  "servers",
  "parameters",
  ...OAPI30_METHODS
]);

export default (o: $PathItemObject, path: string): PathItemObject =>
  typeof o !== "object" ||
  Object.keys(<object>o).filter(a => OAPI30_PATH_ITEM_KEYS.has(a.toLowerCase()))
    .length === 0
    ? { get: operation(o, path) }
    : {
        ...o,
        ...((<PathItemObject>o).parameters
          ? {
              parameters: parameters(
                <$ParametersObject>(<PathItemObject>o).parameters,
                path
              )
            }
          : {}),
        ...[...OAPI30_METHODS]
          .map(a => ((<any>o)[a] ? { [a]: operation((<any>o)[a], path) } : {}))
          .reduce((a, b) => ({ ...a, ...b }), {})
      };
