import { $Content, $$Content } from "../generated/lazy";
import { Content } from "../generated/full";
import mediaType from "./mediaType";

export default (o: $Content): Content =>
  typeof o !== "object" ||
  Object.keys(<object>o).filter(a => a.indexOf("/") !== -1).length === 0
    ? {
        ["application/json"]: mediaType(o)
      }
    : Object.entries(<ContentObject>o)
        .map(([a, b]) => ({ [a]: mediaType(b) }))
        .reduce((a, b) => ({ ...a, ...b }), {});
