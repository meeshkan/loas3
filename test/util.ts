import { Either, fold, isLeft } from "fp-ts/lib/Either";
import { ErrorObject } from "ajv";
import { OpenAPIObject } from "../src/generated/full";

export const mapRightOrThrow = (
  res: Either<ErrorObject[], OpenAPIObject>,
  f: (val: OpenAPIObject) => void
) => {
  return fold((errs: ErrorObject[]) => {
    throw new Error(errs.map(i => i.message).join("\n"));
  }, f)(res);
};
