import openApi from "./lazy/openApi";
import { $OpenAPIObject } from "./model/LazyOpenApi";
import Validator from "./validator";
import { OpenAPIObject } from "openapi3-ts";
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
