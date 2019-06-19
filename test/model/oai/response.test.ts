import { ResponseObject } from "../../../src/model/oai/response";

test("minimal response object validates", () => {
  expect(
    ResponseObject.is({
      description: "bad"
    })
  ).toBe(true);
});

test("response object does not allow extra fields", () => {
  expect(
    ResponseObject.is({
      foo: "bar",
      description: "bad"
    })
  ).toBe(false);
});

test("response object does not allow alien fields", () => {
  expect(
    ResponseObject.is({
      foo: "bar",
      description: "bad"
    })
  ).toBe(false);
});

test("response object allows x- fields", () => {
  expect(
    ResponseObject.is({
      "x-foo": "bar",
      description: "bad"
    })
  ).toBe(true);
});

test("full response object validates", () => {
  expect(
    ResponseObject.is({
      description: "bad",
      content: { 200: { schema: { type: "integer", format: "int64" } } },
      headers: {
        foo: {
          description: "a header",
          schema: { type: "string" }
        }
      },
      links: {
        a: { operationId: "foo" }
      }
    })
  ).toBe(true);
});
