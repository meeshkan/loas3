import Ajv from "ajv";
import AjvErrors from "ajv-errors";
import AjvKeywords from "ajv-keywords";
import fs from "fs";
import yaml from "js-yaml";

const lazy = yaml.load(fs.readFileSync("./schema/lazy.yml").toString());
const full = yaml.load(fs.readFileSync("./schema/full.yml").toString());
export default class Validator {
  public ajv: Ajv.Ajv;
  constructor() {
    this.ajv = new Ajv({
      allErrors: true,
      jsonPointers: true
    });
    AjvKeywords(this.ajv, "switch");
    AjvErrors(this.ajv);
    this.addSchema(full, "oas3");
    this.addSchema(lazy, "loas3");
  }

  public addSchema(schema: any, key: string) {
    this.ajv.addSchema(schema, key);
  }

  public validate(key: string, data: any) {
    this.ajv.validate(key, data);
    return this.ajv.errors;
  }
}
