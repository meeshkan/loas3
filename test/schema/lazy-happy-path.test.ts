import fs from "fs";
import yaml from "js-yaml";
import tv4 from "tv4";

test("full schema validates", () => {
  const instance = yaml.load(
    fs.readFileSync("./test/schema/pet-store-full.yml").toString()
  );
  const lazy = yaml.load(fs.readFileSync("./schema/lazy.yml").toString());
  const full = yaml.load(fs.readFileSync("./schema/full.yml").toString());
  expect(tv4.validate(instance, lazy)).toBe(true);
  expect(tv4.validate(instance, full)).toBe(true);
});

test("schema validates without operations specified", () => {
  const instance = yaml.load(
    fs.readFileSync("./test/schema/pet-store-uses-get-default.yml").toString()
  );
  const schema = yaml.load(fs.readFileSync("./schema/lazy.yml").toString());
  expect(tv4.validate(instance, schema)).toBe(true);
});

test("schema validates without operations or resposnes specified", () => {
  const instance = yaml.load(
    fs
      .readFileSync("./test/schema/pet-store-uses-responses-default.yml")
      .toString()
  );
  const schema = yaml.load(fs.readFileSync("./schema/lazy.yml").toString());
  expect(tv4.validate(instance, schema)).toBe(true);
});

test("schema validates without operations, resposnes or response specified", () => {
  const instance = yaml.load(
    fs
      .readFileSync("./test/schema/pet-store-uses-response-default.yml")
      .toString()
  );
  const schema = yaml.load(fs.readFileSync("./schema/lazy.yml").toString());
  expect(tv4.validate(instance, schema)).toBe(true);
});

test("schema validates without operations, resposnes or response specified", () => {
  const instance = yaml.load(
    fs.readFileSync("./test/schema/pet-store-uses-ref-default.yml").toString()
  );
  const schema = yaml.load(fs.readFileSync("./schema/lazy.yml").toString());
  expect(tv4.validate(instance, schema)).toBe(true);
});
