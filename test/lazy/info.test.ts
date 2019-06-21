import yaml from "js-yaml";
import loas3 from "../../src/";

test("lazy openapi provides default info", () => {
  expect(loas3(yaml.load(``)).info.title).toBe("lazy");
  expect(loas3(yaml.load(``)).info.version).toBe("0.0.0");
  expect(loas3(yaml.load(`paths: { /foo: 1 }`)).info.title).toBe("lazy");
  expect(loas3(yaml.load(`paths: { /foo: 1 }`)).info.version).toBe("0.0.0");
});

test("lazy openapi preserves existing info", () => {
  expect(loas3(yaml.load(`info: { title: foo }`)).info.title).toBe("foo");
  expect(loas3(yaml.load(`info: { title: foo }`)).info.version).toBe("0.0.0");
  expect(loas3(yaml.load(`info: { version: 0.0.1 }`)).info.title).toBe("lazy");
  expect(loas3(yaml.load(`info: { version: 0.0.1 }`)).info.version).toBe(
    "0.0.1"
  );
  expect(
    loas3(yaml.load(`info: { description: foobar }`)).info.description
  ).toBe("foobar");
  expect(
    loas3(yaml.load(`info: { version: 0.0.1, description: foobar }`)).info
      .description
  ).toBe("foobar");
});
