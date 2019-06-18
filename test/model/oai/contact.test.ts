import { ContactObject } from "../../../src/model/oai/contact";

test("contact object validates", () => {
  expect(
    ContactObject.is({
      name: "Mike",
      email: "mike@meeshkan.com",
      url: "https://meeshkan.com"
    })
  ).toBe(true);
  expect(
    ContactObject.is({
      name: "Mike",
      email: "mike@meeshkan.com",
      url: "https://meeshkan.com",
      notallowed: "crash"
    })
  ).toBe(false);
  expect(
    ContactObject.is({
      name: "Mike",
      email: "mike@meeshkan.com",
      url: 1
    })
  ).toBe(false);
});
