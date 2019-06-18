import { OpenAPIPrimitiveDataType, SchemaObject } from "../../../src/model/oai/schema";


test("int schema validates", () => {
    expect(SchemaObject.is({
        type: "integer",
        format: "int64"
    })).toBe(true);
    expect(SchemaObject.is({
        type: "integer",
        format: "int63"
    })).toBe(false);
    expect(SchemaObject.is({
        type: "integer",
        format: "int64",
        required: true,
    })).toBe(true);
    expect(SchemaObject.is({
        type: "integer",
        format: "int64",
        required: "foo",
    })).toBe(false);
});

test("number schema validates", () => {
    expect(SchemaObject.is({
        type: "number",
        format: "int64"
    })).toBe(false);
    expect(SchemaObject.is({
        type: "number",
        format: "float"
    })).toBe(true);
});

test("string schema validates", () => {
    expect(SchemaObject.decode({
        type: "string",
    }).value).toEqual({
        type: "string",
    });
    expect(SchemaObject.decode({
        type: "string",
        format: "binary"
    }).value).toEqual({
        type: "string",
        format: "binary"
    });
    expect(SchemaObject.is({
        type: "string",
        format: "foo"
    })).toBe(false);
});

test.skip("test int enum", () => {
    expect(SchemaObject.is({
        type: "integer",
        format: "int64",
        enum: [1,2,3]
    })).toBe(true);
    expect(SchemaObject.decode({
        type: "integer",
        format: "int64",
        enum: [1,2,"foo"]
    })).toBe(false);
})

test("test object", () => {
    expect(SchemaObject.is({
        type: "object",
        properties: {}
    })).toBe(true);
    expect(SchemaObject.is({
        type: "object",
        properties: {
            foo: "a"
        }
    })).toBe(false);
    expect(SchemaObject.is({
        type: "object",
        properties: {
            foo: {
                type: "string"
            }
        }
    })).toBe(true);
});

test("test array", () => {
    expect(SchemaObject.is({
        type: "array",
    })).toBe(true);
    expect(SchemaObject.is({
        type: "array",
        items: {
            foo: "a"
        }
    })).toBe(false);
    expect(SchemaObject.is({
        type: "array",
        items: {
            type: "string"
        }
    })).toBe(true);
})