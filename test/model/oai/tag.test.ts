import { TagObject } from "../../../src/model/oai/tag";

test("tag object validates", () => {
  expect(
    TagObject.is({
      name: "hello",
      description: "bad",
      externalDocs: {
        url: "https://foo.bar.com"
      }
    })
  ).toBe(true);
});

test("small tag object validates", () => {
  expect(
    TagObject.is({
      name: "hello",
    })
  ).toBe(true);
});
test("tag empty object does not validate", () => {
  expect(TagObject.is({})).toBe(false);
});
test("tag object with bad type fails", () => {
  expect(
    TagObject.is({
      name: "Mike",
      description: 1
    })
  ).toBe(false);
});
test("tag object with extraneous field fails", () => {
  expect(
    TagObject.is({
      name: "Mike",
      foo: "1"
    })
  ).toBe(false);
});
test("tag object with x- field validates", () => {
  expect(
    TagObject.is({
      name: "Mike",
      "x-foo": "1"
    })
  ).toBe(true);
});
