import { _is, _type } from "./util";

const isReference = _is<ReferenceObject>({ $ref: "string" }, {});
export type ReferenceObject = { $ref: string };
export const ReferenceObject = _type<ReferenceObject>(
  "ReferenceObject",
  isReference
);
