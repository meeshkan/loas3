import { LicenseObject } from "../../../src/model/oai/license";

test("license object validates", () => {
  expect(
    LicenseObject.is({
      name: "Apache-2.0",
      url: "https://meeshkan.com"
    })
  ).toBe(true);
  expect(
    LicenseObject.is({
      name: "Apache-2.0",
      url: "https://meeshkan.com",
      extra: "bad"
    })
  ).toBe(false);
  expect(
    LicenseObject.is({
      name: "Apache-2.0",
      url: "https://meeshkan.com",
      "x-extra": "good"
    })
  ).toBe(true);
  expect(
    LicenseObject.is({
      url: "https://meeshkan.com"
    })
  ).toBe(false);
});
