import { XMLObject } from "../../../src/model/oai/xml";

test("contact object validates", () => {
  expect(
    XMLObject.is({
      name: "a",
      prefix: "b"
    })
  ).toBe(true);
  expect(XMLObject.is({})).toBe(true);
  expect(
    XMLObject.is({
      name: "Mike",
      prefix: 1
    })
  ).toBe(false);
  expect(
    XMLObject.is({
      name: "Mike",
      foo: "1"
    })
  ).toBe(false);
  expect(
    XMLObject.is({
      name: "Mike",
      "x-foo": "1"
    })
  ).toBe(true);
});
