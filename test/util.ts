import { Either, fold, tryCatch } from "fp-ts/lib/Either";
import { ErrorObject } from "ajv";
import { OpenAPIObject } from "../src/generated/full";
import yaml from "js-yaml";
import fs from "fs";

export const mapRightOrThrow = (
  res: Either<ErrorObject[], OpenAPIObject>,
  f: (val: OpenAPIObject) => void
) => {
  return fold((errs: ErrorObject[]) => {
    throw new Error(errs.map(i => i.message).join("\n"));
  }, f)(res);
};

export const loadYaml = (pathToFile: string): object => {
  return yaml.load(fs.readFileSync(pathToFile, "utf-8"));
};

export const loadYamlSafe = (pathToFile: string): Either<Error, object> => {
  return tryCatch(
    () => yaml.load(fs.readFileSync(pathToFile, "utf-8")),
    (err: unknown) =>
      new Error(`Failed reading ${pathToFile}: ${JSON.stringify(err)}`)
  );
};
