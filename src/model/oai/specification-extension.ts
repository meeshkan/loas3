import * as t from "io-ts";

const isSpecificationExtension = (u: unknown): u is SpecificationExtension =>
  typeof u === "object" &&
  Object.keys(u as object)
    .map(i => typeof i === "string" && i.substring(0, 2) === "x-")
    .reduce((a, b) => a && b);

export interface SpecificationExtension {
  [key: string]: any;
}

export const SpecificationExtension = new t.Type<SpecificationExtension>(
  "string",
  isSpecificationExtension,
  (u, c) => (isSpecificationExtension(u) ? t.success(u) : t.failure(u, c)),
  t.identity
);
