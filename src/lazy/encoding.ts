import { $Encoding } from "../generated/lazy";
import { Encoding } from "../generated/full";

// not sure why necessary, but $Header -> Header conversion barfs in typing
// probably because the Record<A,B> generic is not smart enough to induce that $Header is effectively Header
export default ({ headers, ...rest }: $Encoding): Encoding => ({
  ...rest,
  ...(headers
    ? Object.entries(headers)
        .map(([a, b]) => ({ [a]: b }))
        .reduce((a, b) => ({ ...a, ...b }), {})
    : {})
});
