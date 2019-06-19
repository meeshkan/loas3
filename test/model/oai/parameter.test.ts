import {
  ParameterObject,
  KnownHeaderObject
} from "../../../src/model/oai/parameter";

test("reference object cannot be empty", () => {
  expect(ParameterObject.is({})).toBe(false);
});
test("valid query forms", () => {
  expect(
    ParameterObject.is({
      name: "foo",
      in: "query",
      style: "form",
      description: "bad",
      schema: { type: "string" }
    })
  ).toBe(true);
  expect(
    ParameterObject.is({
      name: "foo",
      in: "query",
      style: "deepObject",
      description: "bad",
      schema: { type: "string" }
    })
  ).toBe(true);
  expect(
    ParameterObject.is({
      name: "foo",
      in: "query",
      style: "pipeDelimited",
      description: "bad",
      schema: { type: "string" }
    })
  ).toBe(true);
  expect(
    ParameterObject.is({
      name: "foo",
      in: "query",
      style: "spaceDelimited",
      description: "bad",
      schema: { type: "string" }
    })
  ).toBe(true);
  expect(
    ParameterObject.is({
      name: "foo",
      in: "query",
      style: "shouldNotExist",
      description: "bad",
      schema: { type: "string" }
    })
  ).toBe(false);
});

test("valid header forms", () => {
  expect(
    ParameterObject.is({
      name: "foo",
      in: "header",
      style: "simple",
      "x-addl": "hi",
      description: "bad",
      schema: { type: "string" }
    })
  ).toBe(true);
  expect(
    ParameterObject.is({
      name: "foo",
      in: "header",
      style: "form",
      description: "bad",
      schema: { type: "string" }
    })
  ).toBe(false);
});

test("valid known header forms", () => {
  expect(
    KnownHeaderObject.is({
      style: "simple",
      "x-addl": "hi",
      description: "bad",
      schema: { type: "string" }
    })
  ).toBe(true);
  expect(
    KnownHeaderObject.is({
      style: "form",
      description: "bad",
      schema: { type: "string" }
    })
  ).toBe(false);
});

test("known header lacks in and name", () => {
  expect(
    KnownHeaderObject.is({
      name: "willcrash",
      style: "simple",
      description: "bad",
      schema: { type: "string" }
    })
  ).toBe(false);
  expect(
    KnownHeaderObject.is({
      in: "willcrash",
      style: "simple",
      description: "bad",
      schema: { type: "string" }
    })
  ).toBe(false);
});

test("valid cookie forms", () => {
  expect(
    ParameterObject.is({
      name: "foo",
      in: "cookie",
      "x-addl": "hi",
      style: "form",
      description: "bad",
      schema: { type: "string" }
    })
  ).toBe(true);
  expect(
    ParameterObject.is({
      name: "foo",
      in: "cookie",
      style: "simple",
      description: "bad",
      schema: { type: "string" }
    })
  ).toBe(false);
});

test("valid path forms", () => {
  expect(
    ParameterObject.is({
      name: "foo",
      in: "path",
      required: true,
      style: "matrix",
      description: "bad",
      schema: { type: "string" }
    })
  ).toBe(true);
  expect(
    ParameterObject.is({
      name: "foo",
      in: "path",
      required: true,
      style: "label",
      description: "bad",
      schema: { type: "string" }
    })
  ).toBe(true);
  expect(
    ParameterObject.is({
      name: "foo",
      in: "path",
      required: true,
      style: "simple",
      "x-addl": "hi",
      description: "bad",
      schema: { type: "string" }
    })
  ).toBe(true);
  expect(
    ParameterObject.is({
      name: "foo",
      in: "path",
      style: "form",
      description: "bad",
      schema: { type: "string" }
    })
  ).toBe(false);
});

test("path is always required", () => {
  expect(
    ParameterObject.is({
      name: "foo",
      in: "path",
      style: "matrix",
      "x-addl": "hi",
      description: "bad",
      schema: { type: "string" }
    })
  ).toBe(false);

  expect(
    ParameterObject.is({
      name: "foo",
      in: "path",
      required: false,
      style: "simple",
      description: "bad",
      schema: { type: "string" }
    })
  ).toBe(false);
});
