import t from "io-ts";

export const SecurityRequirementObject = t.record(t.string, t.array(t.string));
export type SecurityRequirementObject = t.TypeOf<
  typeof SecurityRequirementObject
>;
