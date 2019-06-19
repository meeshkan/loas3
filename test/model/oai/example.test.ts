import { ExampleObject } from "../../../src/model/oai/example";

test("empty example object validates", () => {
  expect(ExampleObject.is({})).toBe(true);
});
test("example object with incorrectly typed fails", () => {
  expect(ExampleObject.is({
    summary: 1
  })).toBe(false);
});
test("example object with correctly typed succeeds", () => {
  expect(ExampleObject.is({
    summary: "1",
    description: "1",
    value: "1",
    externalValue: "1"
  })).toBe(true);
});
test("example object with x- field succeeds", () => {
  expect(ExampleObject.is({
    summary: "application/json",
    "x-good": "field"
  })).toBe(true);
});
test("example object with spurious field fails", () => {
  expect(ExampleObject.is({
    summary: "application/json",
    bad: "field"
  })).toBe(false);
});