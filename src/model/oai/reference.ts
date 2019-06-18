import { _is, L, _type } from "./util";
import { type } from "io-ts";

const isReference = _is<ReferenceObject>({ $ref: "string" }, {});
export type ReferenceObject = { $ref: string };
export const ReferenceObject = _type<ReferenceObject>("ReferenceObject", isReference);
