import {
  $PathItem,
  is$$PathItem,
  is$Schema,
  is$Operation,
  is$LazyLazyParams,
  is$LazyParams,
  $$PathItem,
  is$Parameter
} from "../generated/lazy";
import _parameters from "./parameters";
import { _lazy, _lazylazy } from "./parameter";
import { PathItem } from "../generated/full";
import _operation from "./operation";
import _mediaType from "./mediaType";
import _schema from "./schema";

const __ = (
  {
    get,
    put,
    post,
    delete: _delete,
    options,
    head,
    patch,
    trace,
    parameters,
    ...rest
  }: $$PathItem,
  path: string
): PathItem => ({
  ...rest,
  ...(parameters
    ? {
        parameters: _parameters(parameters)
      }
    : {}),
  ...(get ? { get: _operation(get, path) } : {}),
  ...(put ? { put: _operation(put, path) } : {}),
  ...(post ? { post: _operation(post, path) } : {}),
  ...(_delete ? { delete: _operation(_delete, path) } : {}),
  ...(options ? { options: _operation(options, path) } : {}),
  ...(head ? { head: _operation(head, path) } : {}),
  ...(patch ? { patch: _operation(patch, path) } : {}),
  ...(trace ? { trace: _operation(trace, path) } : {})
});

export default (o: $PathItem, path: string): PathItem =>
  is$$PathItem(o)
    ? __(o, path)
    : is$Operation(o)
    ? { get: _operation(o, path) }
    : {};
