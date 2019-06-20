import {
  $ParametersObject,
  $ParameterObject,
  LazyParameter,
  LazyParameters
} from "../model/LazyOpenApi";
import { ReferenceObject, ParameterObject } from "openapi3-ts";
import parameter from "./parameter";

const OPEN_API_PARAMETER_IN_NAMES = new Set([
  "query",
  "header",
  "path",
  "cookie"
]);
// Lazy paramater is kv pairs
/*
export default (o: $ParametersObject, path: string): (ReferenceObject | ParameterObject)[]  =>
  o instanceof Array ?
  o.map((i: ParameterObject) => parameter(i, path)) :
  Object.keys(o).filter(a => OPEN_API_PARAMETER_IN_NAMES.has(a)).length !== 0 ?
  Object.keys(o)
    .map(i => Object.keys(i)
      .map(j => parameter(o[i], path, {name: j, $in: i})))
    .reduce((a, b) => ([...a, ...b]), []) : // { header: { ... }, query: { ... }}
  Object.keys(o).map(i => parameter(o[i], path, { name: i}));
*/

export default (
  o: $ParametersObject,
  path: string
): (ReferenceObject | ParameterObject)[] =>
  o instanceof Array
    ? (o as Array<ParameterObject>).map((i: ParameterObject) =>
        parameter(i, path)
      )
    : Object.keys(o).filter(a => OPEN_API_PARAMETER_IN_NAMES.has(a)).length !==
      0
    ? Object.entries(o)
        .map(([k0, v0]) =>
          Object.entries(v0).map(([k1, v1]) =>
            parameter(v1 as $ParameterObject, path, { name: k1, $in: k0 })
          )
        )
        .reduce((a, b) => [...a, ...b], []) // { header: { ... }, query: { ... }}
    : Object.entries(o).map(([k, v]) => parameter(v, path, { name: k }));
