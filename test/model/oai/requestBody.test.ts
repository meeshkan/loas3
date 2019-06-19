import { RequestBodyObject } from "../../../src/model/oai/requestBody";

test("minimal request body object validates", () => {
  expect(
    RequestBodyObject.is({
      content: { "application/json": { schema: { type: "string" } } }
    })
  ).toBe(true);
});

test("full request body object validates", () => {
  expect(
    RequestBodyObject.is({
      content: { "application/json": { schema: { type: "string" } } },
      description: "not very helpful",
      required: false
    })
  ).toBe(true);
});

test("request body object rejects bad fields", () => {
  expect(
    RequestBodyObject.is({
      reject: "me",
      content: { "application/json": { schema: { type: "string" } } }
    })
  ).toBe(false);
});

test("request body object handles x- fields", () => {
  expect(
    RequestBodyObject.is({
      "x-do-not-reject": "me",
      content: { "application/json": { schema: { type: "string" } } }
    })
  ).toBe(true);
});
