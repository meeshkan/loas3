import { Either, left, right } from 'fp-ts/lib/Either';
import openApi from "./lazy/openApi";
import { $OpenAPIObject } from "./generated/lazy";
import Validator from "./validator";
import { OpenAPIObject } from "./generated/full";
import { ErrorObject } from "ajv";

export default (o: $OpenAPIObject): Either<ErrorObject[], OpenAPIObject> => {
  const validator = new Validator();
  const errors = validator.validate("loas3", o);
  if (errors && errors.length) {
      left(errors)
  }
  return right(openApi(o));
};
