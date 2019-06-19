import { LinkObject } from "../../../src/model/oai/link";

test("link object with operationId validates", () => {
  expect(
    LinkObject.is({
      operationId: "foo"
    })
  ).toBe(true);
});

test("link object with operationRef validates", () => {
  expect(
    LinkObject.is({
      operationRef: "foo"
    })
  ).toBe(true);
});

test("link object with full fields validates", () => {
  expect(
    LinkObject.is({
      operationRef: "foo",
      parameters: {},
      requestBody: "foo",
      description: "a",
      server: { url: "a" }
    })
  ).toBe(true);
});

test("link object with undefined field fails", () => {
  expect(
    LinkObject.is({
      operationRef: "foo",
      parameters: {},
      requestBody: "foo",
      rando: "a",
      description: "a",
      server: { url: "a" }
    })
  ).toBe(false);
});

test("link object cannot have both operationRef and operationId", () => {
  expect(
    LinkObject.is({
      operationId: "foo",
      operationRef: "foo",
      parameters: {},
      requestBody: "foo",
      "x-rando": "a",
      description: "a",
      server: { url: "a" }
    })
  ).toBe(false);
});

test("link object with x- field passes", () => {
  expect(
    LinkObject.is({
      operationRef: "foo",
      parameters: {},
      requestBody: "foo",
      "x-rando": "a",
      description: "a",
      server: { url: "a" }
    })
  ).toBe(true);
});