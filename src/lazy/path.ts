import { $PathItemObject, $ParametersObject } from "../model/LazyOpenApi";
import { PathItemObject } from "../model/OpenApi";
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
  Object.keys(o as object).filter(a =>
    OAPI30_PATH_ITEM_KEYS.has(a.toLowerCase())
  ).length === 0
    ? { get: operation(o, path) }
    : {
        ...o,
        ...((o as PathItemObject).parameters
          ? {
              parameters: parameters(
                (o as PathItemObject).parameters as $ParametersObject,
                path
              )
            }
          : {}),
        ...[...OAPI30_METHODS]
          .map(a =>
            (o as any)[a] ? { [a]: operation((o as any)[a], path) } : {}
          )
          .reduce((a, b) => ({ ...a, ...b }), {})
      };
