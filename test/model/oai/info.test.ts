import { InfoObject } from "../../../src/model/oai/info";

test("info object validates", () => {
  expect(
    InfoObject.is({
      title: "foo",
      version: "0.0.0",
      license: { name: "a" }
    })
  ).toBe(true);
});
test("info object with malformed license fails", () => {
  expect(
    InfoObject.is({
      title: "foo",
      version: "0.0.0",
      license: {}
    })
  ).toBe(false);
});
test("info object with missing version license fails", () => {
  expect(
    InfoObject.is({
      title: "foo",
      license: { name: "a" }
    })
  ).toBe(false);
});
test("info object with undefined field fails", () => {
  expect(
    InfoObject.is({
      title: "foo",
      version: "0.0.0",
      foo: "bar"
    })
  ).toBe(false);
});
test("info object with x- field succeeds", () => {
  expect(
    InfoObject.is({
      title: "foo",
      version: "0.0.0",
      "x-foo": "bar"
    })
  ).toBe(true);
});
test("info object with wrong type field fails", () => {
  expect(
    InfoObject.is({
      title: 1,
      version: "0.0.0"
    })
  ).toBe(false);
});
