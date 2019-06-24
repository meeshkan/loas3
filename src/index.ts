import openApi from "./lazy/openApi";
import { $OpenAPIObject } from "./generated/lazy";
import Validator from "./validator";
import { OpenAPIObject } from "./generated/full";
import { ErrorObject } from "ajv";
export type LazyResult = {
  errors?: ErrorObject[];
  val?: OpenAPIObject;
};

export default (o: $OpenAPIObject): LazyResult => {
  const validator = new Validator();
  const errors = validator.validate("loas3", o);
  if (errors && errors.length) {
    return {
      errors
    };
  }
  return { val: openApi(o) };
};
