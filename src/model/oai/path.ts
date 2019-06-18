import { OperationObject } from "./operation";
import { ReferenceObject } from "./reference";
import { ServerObject } from "./server";
import { ParameterObject } from "./parameter";
import { _type, _is, _choose, _choose_val } from "./util";

const isPathItemObject = _is<PathItemObject>(
  {},
  {
    summary: "string",
    description: "string",
    servers: v =>
      v instanceof Array &&
      v.map(i => ServerObject.is(i)).reduce((a, b) => a && b, true),
    parameters: v =>
      v instanceof Array &&
      v
        .map(i => ReferenceObject.is(i) || ParameterObject.is(i))
        .reduce((a, b) => a && b, true),
    get: _choose([OperationObject]),
    put: _choose([OperationObject]),
    post: _choose([OperationObject]),
    delete: _choose([OperationObject]),
    trace: _choose([OperationObject]),
    options: _choose([OperationObject]),
    head: _choose([OperationObject]),
    patch: _choose([OperationObject])
  }
);
const PathItemObject = _type<PathItemObject>(
  "PathItemObject",
  isPathItemObject
);
export type PathItemObject = {
  summary?: string;
  description?: string;
  servers?: ServerObject[];
  parameters?: (ParameterObject | ReferenceObject)[];
  get?: OperationObject;
  put?: OperationObject;
  post?: OperationObject;
  delete?: OperationObject;
  trace?: OperationObject;
  options?: OperationObject;
  head?: OperationObject;
  patch?: OperationObject;
};

export type PathsObject = { [key: string]: PathItemObject | ReferenceObject };
const PathsObject = _type<PathsObject>(
  "PathsObject",
  (u: unknown): u is PathsObject => _choose_val([PathItemObject])(u)
);
