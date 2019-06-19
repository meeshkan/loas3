import { ComponentsObject } from "../../../src/model/oai/components";

test("empty components object validates", () => {
  expect(ComponentsObject.is({})).toBe(true);
});

test("full components object with unwelcome field fails", () => {
  expect(ComponentsObject.is({
    schemas: {},
    responses: {},
    parameters: {},
    examples: {},
    requestBodies: {},
    headers: {},
    securitySchemas: {},
    links: {},
    sneaky: {}
  })).toBe(false);
});

test("full components object with x- field fails", () => {
  expect(ComponentsObject.is({
    schemas: {},
    responses: {},
    parameters: {},
    examples: {},
    requestBodies: {},
    headers: {},
    securitySchemas: {},
    links: {},
    "x-sneaky": {}
  })).toBe(true);
});

test("full components object validates", () => {
  expect(ComponentsObject.is({
    schemas: {},
    responses: {},
    parameters: {},
    examples: {},
    requestBodies: {},
    headers: {},
    securitySchemas: {},
    links: {},
  })).toBe(true);
});

test("full components object validates", () => {
  expect(ComponentsObject.is({
    schemas: {
      myschema: { type: "string" },
      myref: {
        $ref: "foo"
      }
    },
    responses: {
      myresponse: {
        description: "ok"
      },
      myref: {
        $ref: "foo"
      }
    },
    parameters: {
      myparameter: {
        name: "foo",
        in: "query",
        description: "useless",
        schema: { type: "array", items: { type: "string" }}
      },
      myref: {
        $ref: "foo"
      }
    },
    examples: {
      myexample: {
        summary: "1",
        description: "1",
        value: "1",
        externalValue: "1"
      },
      myref: {
        $ref: "foo"
      }
    },
    requestBodies: {
      myRequestBody: {
        content: { "application/json": { schema: { type: "string" } } },
        description: "not very helpful",
        required: false
      },
      myref: {
        $ref: "foo"
      }
    },
    headers: {
      myheader: {
        style: "simple",
        description: "bad",
        schema: { type: "string" }
      },
      myref: {
        $ref: "foo"
      }
    },
    securitySchemas: {
      mysecurity: {
        type: "foo",
        name: "bar",
        in: "hello",
        scheme: "world",
        flows: {},
        openIdConnectUrl: "none"
      },
      myref: {
        $ref: "foo"
      }
    },
    links: {
      mylink: {
        operationId: "a"
      },
      myref: {
        $ref: "foo"
      }
    },
  })).toBe(true);
});