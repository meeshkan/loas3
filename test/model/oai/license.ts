import { LicenseObject } from "../../../src/model/oai/license";

test("license object validates", () => {
    expect(LicenseObject.decode({
        name: "Apache-2.0",
        url: "https://meeshkan.com"
    })._tag).toBe("Right");
    expect(LicenseObject.decode({
        url: "https://meeshkan.com"
    })._tag).toBe("Left");
});