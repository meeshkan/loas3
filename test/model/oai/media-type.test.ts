import { MediaTypeObject } from "../../../src/model/oai/media-type";

test("empty media type object fails", () => {
  expect(MediaTypeObject.is({})).toBe(false);
});

test("media type object succeeds with schema", () => {
  expect(
    MediaTypeObject.is({
      schema: {
        type: "string"
      }
    })
  ).toBe(true);
});

test("media type object succeeds with x- field", () => {
  expect(
    MediaTypeObject.is({
      schema: {
        type: "string"
      },
      "x-good": 2
    })
  ).toBe(true);
});

test("media type object fails with alien field", () => {
  expect(
    MediaTypeObject.is({
      schema: {
        type: "string"
      },
      bad: 2
    })
  ).toBe(false);
});

test("media type object fails with broken schema", () => {
  expect(
    MediaTypeObject.is({
      schema: {
        type: "failme"
      }
    })
  ).toBe(false);
});

test("media type object succeeds with all fields", () => {
  expect(
    MediaTypeObject.is({
      schema: {
        type: "string"
      },
      example: {},
      examples: {
        hello: {
          description: "foo",
          value: "bar"
        },
        world: {
          $ref: "#/content/foo"
        }
      },
      encoding: {
        "my favorite encoding": {
          contentType: "application/json"
        }
      }
    })
  ).toBe(true);
});
