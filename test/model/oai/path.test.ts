import { PathItemObject } from "../../../src/model/oai/path";

test("empty path object validates", () => {
  expect(PathItemObject.is({})).toBe(true);
});

test("minimal path with validate", () => {
  expect(
    PathItemObject.is({
      get: { responses: { 200: { description: "ok" } } }
    })
  ).toBe(true);
});

test("minimal path with foreign field will fail validate", () => {
  expect(
    PathItemObject.is({
      foo: { responses: { 200: { description: "ok" } } },
      get: { responses: { 200: { description: "ok" } } }
    })
  ).toBe(false);
});

test("minimal path with foreign field will fail validate", () => {
  expect(
    PathItemObject.is({
      get: { responses: { 200: { description: "ok" } } },
      summary: "foo",
      description: "bar",
      servers: [{url: "my/home"}],
      parameters: [
        {
          name: "foo",
          in: "header",
          description: "a",
          schema: {type: "string"}
        }
      ]
    })
  ).toBe(true);
});