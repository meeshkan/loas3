import { $Paths } from "../generated/lazy";
import { Paths } from "../generated/full";
import _path from "./path";

export default (o: $Paths): Paths =>
  o
    ? Object.entries(o)
        .map(([k, v]) => ({ [k]: _path(v, k) }))
        .reduce((a, b) => ({ ...a, ...b }), {})
    : {};
