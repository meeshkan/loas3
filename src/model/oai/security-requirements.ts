import { _type, _is, _choose_val } from "./util";

const isSecurityRequirementObject = (
  u: unknown
): u is SecurityRequirementObject =>
  u &&
  typeof u === "object" &&
  !(u instanceof Array) &&
  Object.values(u as any)
    .map(
      i =>
        i instanceof Array &&
        i.map(j => typeof j === "string").reduce((a, b) => a && b, true)
    )
    .reduce((a, b) => a && b, true);

export type SecurityRequirementObject = {
  [key: string]: string[];
};
export const SecurityRequirementObject = _type<SecurityRequirementObject>(
  "SecurityRequirementObject",
  isSecurityRequirementObject
);
