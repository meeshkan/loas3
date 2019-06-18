import { InfoObject } from "../../../src/model/oai/info";

test("info object validates", () => {
  expect(
    InfoObject.is({
      title: "foo",
      version: "0.0.0",
      license: { name: "a" }
    })
  ).toBe(true);
  expect(
    InfoObject.is({
      title: "foo",
      version: "0.0.0",
      license: {}
    })
  ).toBe(false);
  expect(
    InfoObject.is({
      title: "foo",
      license: { name: "a" }
    })
  ).toBe(false);
});
