import { InfoObject } from "../../../src/model/oai/info";

test("info object validates", () => {
  expect(
    InfoObject.decode({
      title: "foo",
      version: "0.0.0",
      license: { name: "a" }
    })._tag
  ).toBe("Right");
  expect(
    InfoObject.decode({
      title: "foo",
      version: "0.0.0",
      license: {}
    })._tag
  ).toBe("Left");
  expect(
    InfoObject.decode({
      title: "foo",
      license: { name: "a" }
    })._tag
  ).toBe("Left");
});
