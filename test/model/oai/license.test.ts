import { LicenseObject } from "../../../src/model/oai/license";

test("license object validates", () => {
  expect(
    LicenseObject.is({
      name: "Apache-2.0",
      url: "https://meeshkan.com"
    })
  ).toBe(true);
});
test("license object with extra field fails", () => {
  expect(
    LicenseObject.is({
      name: "Apache-2.0",
      url: "https://meeshkan.com",
      extra: "bad"
    })
  ).toBe(false);
});
test("license object with x- field succeeds", () => {
  expect(
    LicenseObject.is({
      name: "Apache-2.0",
      url: "https://meeshkan.com",
      "x-extra": "good"
    })
  ).toBe(true);
});
test("license without name fails", () => {
  expect(
    LicenseObject.is({
      url: "https://meeshkan.com"
    })
  ).toBe(false);
});
