import { _is, _type } from "./util";

const isReference = (u: unknown): u is ReferenceObject =>
  u && typeof u === "object" && Object.keys(u as any).length === 1 && typeof (u as any).$ref === "string";
export type ReferenceObject = { $ref: string };
export const ReferenceObject = _type<ReferenceObject>(
  "ReferenceObject",
  isReference
);
