import { $Encoding } from "../generated/lazy";
import { Encoding } from "../generated/full";
import _header from "./header";

export default ({ headers, ...rest }: $Encoding): Encoding => ({
  ...rest,
  ...(headers
    ? {
        headers: Object.entries(headers)
          .map(([a, b]) => ({ [a]: _header(b) }))
          .reduce((a, b) => ({ ...a, ...b }), {}),
      }
    : {}),
});
