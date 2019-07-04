import { Either, isLeft } from "fp-ts/lib/Either";
import { ErrorObject } from "ajv";
import { OpenAPIObject } from "../src/generated/full";
export const lazy = (
  res: Either<ErrorObject[], OpenAPIObject>,
  f: (val: OpenAPIObject) => void
) => {
  if (isLeft(res)) {
    throw new Error(res.left.map(i => i.message).join("\n"));
  }
  return f(res.right);
};
