import fs from "fs";
import yaml from "js-yaml";
import Validator from "../../src/validator";

test("full schema validates", () => {
  const instance = yaml.load(
    fs.readFileSync("./test/schema/pet-store-full.yml").toString()
  );
  const validator = new Validator();
  expect(validator.validate("oas3", instance)).toBe(true);
  expect(validator.validate("loas3", instance)).toBe(true);
});


test("schema validates without operations specified", () => {
  const instance = yaml.load(
    fs.readFileSync("./test/schema/pet-store-uses-get-default.yml").toString()
  );
  const validator = new Validator();
  expect(validator.validate("loas3", instance)).toBe(true);
});

test("schema validates without operations or resposnes specified", () => {
  const instance = yaml.load(
    fs
      .readFileSync("./test/schema/pet-store-uses-responses-default.yml")
      .toString()
  );
  const validator = new Validator();
  expect(validator.validate("loas3", instance)).toBe(true);
});

test("schema validates without operations, resposnes or response specified", () => {
  const instance = yaml.load(
    fs
      .readFileSync("./test/schema/pet-store-uses-response-default.yml")
      .toString()
  );
  const validator = new Validator();
  expect(validator.validate("loas3", instance)).toBe(true);
});

test("schema validates without operations, resposnes or response specified", () => {
  const instance = yaml.load(
    fs.readFileSync("./test/schema/pet-store-uses-ref-default.yml").toString()
  );
  const validator = new Validator();
  expect(validator.validate("loas3", instance)).toBe(true);
});
