import { ContactObject } from "../../../src/model/oai/contact";

test("contact object validates", () => {
  expect(
    ContactObject.decode({
      name: "Mike",
      email: "mike@meeshkan.com",
      url: "https://meeshkan.com"
    })._tag
  ).toBe("Right");
  expect(
    ContactObject.decode({
      name: "Mike",
      email: "mike@meeshkan.com",
      url: 1
    })._tag
  ).toBe("Left");
});
