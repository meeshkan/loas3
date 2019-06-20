import yaml from "js-yaml";
import { Validator } from "jsonschema";

test("schema validates", () => {
  var v = new Validator();
  var instance = 4;
  var schema = {"type": "number"};
  expect(v.validate(instance, schema).errors.length).toBe(0);
})