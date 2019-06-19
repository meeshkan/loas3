import { EncodingObject } from "../../../src/model/oai/encoding";

test("empty encoding object validates", () => {
  expect(EncodingObject.is({})).toBe(true);
});
test("encoding object with incorrectly typed fails", () => {
  expect(EncodingObject.is({
    contentType: 1
  })).toBe(false);
});
test("encoding object with all fields succeeds", () => {
  expect(EncodingObject.is({
    contentType: "application/json",
    headers: {
      foo: {
        description: "A header",
        required: false,
        schema: {
          type: "string",
        }
      },
      bar: {
        $ref: "#/hello/world"
      },
    },
    style: "foo",
    explode: true,
    allowReserved: true
  })).toBe(true);
});
test("encoding object with malformed header fails", () => {
  expect(EncodingObject.is({
    contentType: "application/json",
    headers: {
      foo: { // no description, so should fail
        required: false,
        schema: {
          type: "string",
        }
      },
      bar: {
        $ref: "#/hello/world"
      },
    },
    style: "foo",
    explode: true,
    allowReserved: true
  })).toBe(false);
});
test("encoding object with x- field succeeds", () => {
  expect(EncodingObject.is({
    contentType: "application/json",
    "x-good": "field"
  })).toBe(true);
});
test("encoding object with spurious field fails", () => {
  expect(EncodingObject.is({
    contentType: "application/json",
    bad: "field"
  })).toBe(false);
});