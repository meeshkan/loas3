import fs from "fs";
import loas from "../src";
import jsYaml from "js-yaml";
import { either, Either, fold, tryCatch } from "fp-ts/lib/either";
import { OpenAPIObject } from "../src/generated/full";
import { pipeable, pipe } from "fp-ts/lib/pipeable";
import { ErrorObject } from "ajv";

// Generic error in CLI
interface ILoasError {
  message: string;
}

type Try<T> = Either<ILoasError, T>;

const _ = pipeable(either);

function parseYamlFileToObject(pathToFile: string): Try<any> {
  return tryCatch(
    () => {
      const contents = fs.readFileSync(pathToFile, "utf-8");
      return jsYaml.safeLoad(contents);
    },
    (e: unknown) => ({ message: `Error reading file: ${JSON.stringify(e)}` })
  );
}

const expandSpec = (spec: any): Try<OpenAPIObject> =>
  pipe(
    spec,
    loas,
    // Map error to be compatible with IError
    _.mapLeft((error: ErrorObject[]) => ({
      message: `Error parsing spec: ${JSON.stringify(error)}`,
    }))
  );

export default function expand(pathToFile: string): OpenAPIObject {
  const specOrErrors: Try<OpenAPIObject> = pipe(
    pathToFile,
    parseYamlFileToObject,
    _.chain(spec => expandSpec(spec))
  );

  return fold(
    (e: ILoasError) => {
      throw Error(`Something went wrong: ${JSON.stringify(e)}`);
    },
    (openApiObject: OpenAPIObject) => {
      return openApiObject;
    }
  )(specOrErrors);
}
