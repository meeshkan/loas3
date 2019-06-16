import yaml from "js-yaml";
import loai3 from "../../src/";

test("lazy openapi provides default version", () => {
  expect(loai3(yaml.load(``)).openapi).toBe("3.0.0");
  expect(loai3(yaml.load(`paths: { /foo: 1 }`)).openapi).toBe("3.0.0");
});

test("lazy openapi preserves existing version", () => {
  expect(loai3(yaml.load(`openapi: 2.0.0`)).openapi).toBe("2.0.0");
});
