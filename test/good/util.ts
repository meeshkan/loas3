import { LazyResult } from "../../src/index";
import { OpenAPIObject } from "openapi3-ts";
export const lazy = (res: LazyResult, f: (val: OpenAPIObject) => void) => {
  const { errors, val } = res;
  if (val) {
    f(val);
  } else {
    throw new Error(
      errors ? errors.map(i => i.message).join("\n") : "inconsistent state"
    );
  }
};
