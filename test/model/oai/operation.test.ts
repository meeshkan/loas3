import { OperationObject } from "../../../src/model/oai/operation";

test("empty operation object fails to validate", () => {
  expect(OperationObject.is({})).toBe(false);
});

test("minimal operation with validate", () => {
  expect(
    OperationObject.is({
      responses: { 200: { description: "ok" } }
    })
  ).toBe(true);
});

test("full operation validates", () => {
  expect(
    OperationObject.is({
      responses: { 200: { description: "ok" } },
      tags: ["foo"],
      summary: "bar",
      description: "a",
      externalDocs: {
        url: "foo.com"
      },
      operationId: "hello",
      parameters: [
        {
          $ref: "bar"
        },
        {
          name: "foo",
          in: "query",
          description: "not helpful",
          schema: { type: "string" }
        }
      ],
      requestBody: {
        content: { "application/json": { schema: { type: "string" } } }
      },
      deprecated: false,
      servers: [
        {
          url: "https://example.com"
        }
      ],
      security: [
        {
          hello: ["world"]
        }
      ]
    })
  ).toBe(true);
});

test("full operation invalid if security is not string", () => {
  expect(
    OperationObject.is({
      responses: { 200: { description: "ok" } },
      tags: ["foo"],
      summary: "bar",
      description: "a",
      externalDocs: {
        url: "foo.com"
      },
      operationId: "hello",
      parameters: [
        {
          $ref: "bar"
        },
        {
          name: "foo",
          in: "query",
          description: "not helpful",
          schema: { type: "string" }
        }
      ],
      requestBody: {
        content: { "application/json": { schema: { type: "string" } } }
      },
      deprecated: false,
      servers: [
        {
          url: "https://example.com"
        }
      ],
      security: [
        {
          hello: [1]
        }
      ]
    })
  ).toBe(false);
});
