import { $Info } from "../generated/lazy";
import { Info } from "../generated/full";

const defaults = {
  title: "lazy",
  version: "0.0.0"
};

export default (o: $Info | undefined): Info =>
  o
    ? {
        ...defaults,
        ...o
      }
    : defaults;
