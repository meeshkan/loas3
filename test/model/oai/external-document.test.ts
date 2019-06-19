import { ExternalDocumentObject } from "../../../src/model/oai/external-document";

test("empty external document object fails", () => {
  expect(ExternalDocumentObject.is({})).toBe(false);
});
test("external documnet object with incorrectly typed fails", () => {
  expect(ExternalDocumentObject.is({
    url: 1
  })).toBe(false);
});
test("external document object with correctly typed succeeds", () => {
  expect(ExternalDocumentObject.is({
    url: "foo.com",
    description: "z"
  })).toBe(true);
});
test("external document object with x- field succeeds", () => {
  expect(ExternalDocumentObject.is({
    url: "foo.com",
    "x-good": "field"
  })).toBe(true);
});
test("external document object with spurious field fails", () => {
  expect(ExternalDocumentObject.is({
    url: "foo.com",
    bad: "field"
  })).toBe(false);
});