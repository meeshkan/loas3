import { ReferenceObject } from "../../../src/model/oai/reference";

test("reference object cannot be empty", () => {
  expect(ReferenceObject.is({})).toBe(false);
});
test("reference object cannot contain extra fields", () => {
  expect(
    ReferenceObject.is({
      $ref: "Idan",
      "x-foo": 1
    })
  ).toBe(false);
});
test("reference object must contain $ref", () => {
  expect(
    ReferenceObject.is({
      $ref: "Kimmo"
    })
  ).toBe(true);
});
