import { SchemaObject } from "../../../src/model/oai/schema";

test("int schema validates", () => {
  expect(
    SchemaObject.is({
      type: "integer",
      format: "int64"
    })
  ).toBe(true);
  expect(
    SchemaObject.is({
      type: "integer",
      format: "int32"
    })
  ).toBe(true);
});
test("int schema with wrong format fails", () => {
  expect(
    SchemaObject.is({
      type: "integer",
      format: "int63"
    })
  ).toBe(false);
});
test("int schema with optional field succeeds", () => {
  expect(
    SchemaObject.is({
      type: "integer",
      format: "int64",
      required: true
    })
  ).toBe(true);
});
test("int schema with incorrectly typed optional field fails", () => {
  expect(
    SchemaObject.is({
      type: "integer",
      format: "int64",
      required: "foo"
    })
  ).toBe(false);
});
test("int schema with unknown field fails", () => {
  expect(
    SchemaObject.is({
      type: "integer",
      format: "int64",
      notrequired: "foo"
    })
  ).toBe(false);
});
test("int schema with x- field succeeds", () => {
  expect(
    SchemaObject.is({
      type: "integer",
      format: "int64",
      "x-hello": "foo"
    })
  ).toBe(true);
});

test("number schema validates", () => {
  expect(
    SchemaObject.is({
      type: "number",
      format: "float"
    })
  ).toBe(true);
  expect(
    SchemaObject.is({
      type: "number",
      format: "double"
    })
  ).toBe(true);
});
test("number schema with wrong format fails", () => {
  expect(
    SchemaObject.is({
      type: "number",
      format: "reallybig"
    })
  ).toBe(false);
});
test("number schema with optional field succeeds", () => {
  expect(
    SchemaObject.is({
      type: "number",
      format: "double",
      required: true
    })
  ).toBe(true);
});
test("number schema with incorrectly typed optional field fails", () => {
  expect(
    SchemaObject.is({
      type: "number",
      format: "float",
      required: "foo"
    })
  ).toBe(false);
});
test("number schema with unknown field fails", () => {
  expect(
    SchemaObject.is({
      type: "number",
      format: "double",
      notrequired: "foo"
    })
  ).toBe(false);
});
test("number schema with x- field succeeds", () => {
  expect(
    SchemaObject.is({
      type: "number",
      format: "float",
      "x-hello": "foo"
    })
  ).toBe(true);
});

test("string schema validates", () => {
  expect(
    SchemaObject.is({
      type: "string",
    })
  ).toBe(true);
  expect(
    SchemaObject.is({
      type: "string",
      format: "byte"
    })
  ).toBe(true);
});
test("string schema with wrong format fails", () => {
  expect(
    SchemaObject.is({
      type: "string",
      format: "reallybig"
    })
  ).toBe(false);
});
test("string schema with optional field succeeds", () => {
  expect(
    SchemaObject.is({
      type: "string",
      format: "byte",
      required: true
    })
  ).toBe(true);
});
test("string schema with incorrectly typed optional field fails", () => {
  expect(
    SchemaObject.is({
      type: "string",
      required: "foo"
    })
  ).toBe(false);
});
test("string schema with unknown field fails", () => {
  expect(
    SchemaObject.is({
      type: "string",
      format: "date",
      notrequired: "foo"
    })
  ).toBe(false);
});
test("string schema with x- field succeeds", () => {
  expect(
    SchemaObject.is({
      type: "string",
      format: "date-time",
      "x-hello": "foo"
    })
  ).toBe(true);
});

test("well formed int enum", () => {
  expect(
    SchemaObject.is({
      type: "integer",
      format: "int64",
      enum: [1, 2, 3]
    })
  ).toBe(true);
});
test("int enum with string in enum fails", () => {
  expect(
    SchemaObject.is({
      type: "integer",
      format: "int64",
      enum: [1, 2, "foo"]
    })
  ).toBe(false);
});
test("int enum with bad default fails", () => {
  expect(
    SchemaObject.is({
      type: "integer",
      format: "int64",
      enum: [1, 2],
      default: 3
    })
  ).toBe(false);
});
test("int enum with good default succeeds", () => {
  expect(
    SchemaObject.is({
      type: "integer",
      format: "int64",
      enum: [1, 2],
      default: 2
    })
  ).toBe(true);
});
test("int enum with extra field fails", () => {
  expect(
    SchemaObject.is({
      type: "integer",
      format: "int64",
      enum: [1, 2],
      bad: "field"
    })
  ).toBe(false);
});
test("int enum with x- field succeeds", () => {
  expect(
    SchemaObject.is({
      type: "integer",
      format: "int64",
      enum: [1, 2],
      default: 2,
      "x-good": true
    })
  ).toBe(true);
});

test("well formed string enum", () => {
  expect(
    SchemaObject.is({
      type: "string",
      enum: ["a", "b"]
    })
  ).toBe(true);
});
test("string enum with int in enum fails", () => {
  expect(
    SchemaObject.is({
      type: "string",
      enum: [1, 2, "foo"]
    })
  ).toBe(false);
});
test("string enum with format fails", () => {
  expect(
    SchemaObject.is({
      type: "string",
      format: "byte",
      enum: ["b", "a"]
    })
  ).toBe(false);
});
test("string enum with bad default fails", () => {
  expect(
    SchemaObject.is({
      type: "string",
      enum: ["b", "a"],
      default: "c"
    })
  ).toBe(false);
});
test("string enum with good default succeeds", () => {
  expect(
    SchemaObject.is({
      type: "string",
      enum: ["a","b"],
      default: "b",
      example: "a"
    })
  ).toBe(true);
});
test("string enum with extra field fails", () => {
  expect(
    SchemaObject.is({
      type: "string",
      enum: ["A"],
      bad: "field"
    })
  ).toBe(false);
});
test("string enum with x- field succeeds", () => {
  expect(
    SchemaObject.is({
      type: "string",
      enum: ["A"],
      example: "A",
      "x-good": true
    })
  ).toBe(true);
});

test("test object", () => {
  expect(
    SchemaObject.is({
      type: "object",
      properties: {}
    })
  ).toBe(true);
  expect(
    SchemaObject.is({
      type: "object",
      properties: {
        foo: "a"
      }
    })
  ).toBe(false);
  expect(
    SchemaObject.is({
      type: "object",
      properties: {
        foo: {
          type: "string"
        }
      }
    })
  ).toBe(true);
});

test("test array", () => {
  expect(
    SchemaObject.is({
      type: "array"
    })
  ).toBe(true);
  expect(
    SchemaObject.is({
      type: "array",
      items: {
        foo: "a"
      }
    })
  ).toBe(false);
  expect(
    SchemaObject.is({
      type: "array",
      items: {
        type: "string"
      }
    })
  ).toBe(true);
});
