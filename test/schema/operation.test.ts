import fs from "fs";
import yaml from "js-yaml";
import { Validator } from "jsonschema";

test("schema validates", () => {
  var v = new Validator();
  var instance = JSON.parse(fs.readFileSync("./pet-store-uses-get-default.yml"));
  var schema = yaml.load(fs.readFileSync("../../schema/lazy.yml"))
  expect(v.validate(instance, schema).errors.length).toBe(0);
})