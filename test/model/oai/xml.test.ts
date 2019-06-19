import { XMLObject } from "../../../src/model/oai/xml";

test("xml object validates", () => {
  expect(
    XMLObject.is({
      name: "a",
      prefix: "b"
    })
  ).toBe(true);
});
test("xml empty object validates", () => {
  expect(XMLObject.is({})).toBe(true);
});
test("xml object with bad type fails", () => {
  expect(
    XMLObject.is({
      name: "Mike",
      prefix: 1
    })
  ).toBe(false);
});
test("xml object with extraneous field fails", () => {
  expect(
    XMLObject.is({
      name: "Mike",
      foo: "1"
    })
  ).toBe(false);
});
test("xml object with x- field validates", () => {
  expect(
    XMLObject.is({
      name: "Mike",
      "x-foo": "1"
    })
  ).toBe(true);
});
