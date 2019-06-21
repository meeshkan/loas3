import fs from "fs";
import yaml from "js-yaml";
import { Validator } from "jsonschema";

test("full schema validates", () => {
  const v = new Validator();
  const instance = yaml.load(
    fs.readFileSync("./test/schema/pet-store-full.yml").toString()
  );
  const lazy = yaml.load(fs.readFileSync("./schema/lazy.yml").toString());
  const full = yaml.load(fs.readFileSync("./schema/full.yml").toString());
  expect(v.validate(instance, lazy).errors.length).toBe(0);
  expect(v.validate(instance, full).errors.length).toBe(0);
});

test("schema validates without operations specified", () => {
  const v = new Validator();
  const instance = yaml.load(
    fs.readFileSync("./test/schema/pet-store-uses-get-default.yml").toString()
  );
  const schema = yaml.load(fs.readFileSync("./schema/lazy.yml").toString());
  expect(v.validate(instance, schema).errors.length).toBe(0);
});

test("schema validates without operations or resposnes specified", () => {
  const v = new Validator();
  const instance = yaml.load(
    fs
      .readFileSync("./test/schema/pet-store-uses-responses-default.yml")
      .toString()
  );
  const schema = yaml.load(fs.readFileSync("./schema/lazy.yml").toString());
  expect(v.validate(instance, schema).errors.length).toBe(0);
});

test("schema validates without operations, resposnes or response specified", () => {
  const v = new Validator();
  const instance = yaml.load(
    fs
      .readFileSync("./test/schema/pet-store-uses-response-default.yml")
      .toString()
  );
  const schema = yaml.load(fs.readFileSync("./schema/lazy.yml").toString());
  expect(v.validate(instance, schema).errors.length).toBe(0);
});

test("schema validates without operations, resposnes or response specified", () => {
  const v = new Validator();
  const instance = yaml.load(
    fs.readFileSync("./test/schema/pet-store-uses-ref-default.yml").toString()
  );
  const schema = yaml.load(fs.readFileSync("./schema/lazy.yml").toString());
  expect(v.validate(instance, schema).errors.length).toBe(0);
});
