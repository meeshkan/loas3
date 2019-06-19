import { ContactObject } from "../../../src/model/oai/contact";

test("empty contact object validates", () => {
  expect(
    ContactObject.is({})
  ).toBe(true);
});
test("fully-formed contact object validates", () => {
  expect(
    ContactObject.is({
      name: "Mike",
      email: "mike@meeshkan.com",
      url: "https://meeshkan.com"
    })
  ).toBe(true);
});
test("contact object with x- field succeeds", () => {
  expect(
    ContactObject.is({
      name: "Mike",
      email: "mike@meeshkan.com",
      "x-allowed": "hi"
    })
  ).toBe(true);
});
test("contact object with undefined field fails", () => {
  expect(
    ContactObject.is({
      name: "Mike",
      email: "mike@meeshkan.com",
      url: "https://meeshkan.com",
      notallowed: "crash"
    })
  ).toBe(false);
});
test("contact object with incorrect type fails", () => {
  expect(
    ContactObject.is({
      name: "Mike",
      email: "mike@meeshkan.com",
      url: 1
    })
  ).toBe(false);
});
