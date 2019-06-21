import fs from "fs";
import yaml from "js-yaml";
import { Validator } from "jsonschema";

test("schema validates without operations specified", () => {
  var v = new Validator();
  var instance = yaml.load(
    fs.readFileSync("./test/schema/pet-store-uses-get-default.yml").toString()
  );
  var schema = yaml.load(fs.readFileSync("./schema/lazy.yml").toString());
  expect(v.validate(instance, schema).errors.length).toBe(0);
});

test("schema validates without operations or resposnes specified", () => {
  var v = new Validator();
  var instance = yaml.load(
    fs
      .readFileSync("./test/schema/pet-store-uses-responses-default.yml")
      .toString()
  );
  var schema = yaml.load(fs.readFileSync("./schema/lazy.yml").toString());
  expect(v.validate(instance, schema).errors.length).toBe(0);
});

test("schema validates without operations, resposnes or response specified", () => {
  var v = new Validator();
  var instance = yaml.load(
    fs
      .readFileSync("./test/schema/pet-store-uses-response-default.yml")
      .toString()
  );
  var schema = yaml.load(fs.readFileSync("./schema/lazy.yml").toString());
  expect(v.validate(instance, schema).errors.length).toBe(0);
});

test("schema validates without operations, resposnes or response specified", () => {
  var v = new Validator();
  var instance = yaml.load(
    fs.readFileSync("./test/schema/pet-store-uses-ref-default.yml").toString()
  );
  var schema = yaml.load(fs.readFileSync("./schema/lazy.yml").toString());
  expect(v.validate(instance, schema).errors).toBe(0);
});
