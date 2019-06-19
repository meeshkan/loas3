import { SecurityRequirementObject } from "../../../src/model/oai/security-requirements";

test("security requirements object can be empty", () => {
  expect(SecurityRequirementObject.is({})).toBe(true);
});
test("security requirements object takes string array", () => {
  expect(
    SecurityRequirementObject.is({
      a: ["b"]
    })
  ).toBe(true);
});
test("security requirements object fails when not string array", () => {
  expect(
    SecurityRequirementObject.is({
      a: ["b", 1]
    })
  ).toBe(false);
});
