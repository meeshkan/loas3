import fs from "fs";
import loas from "../src";
import jsYaml from "js-yaml";
import { either, Either, fold, isLeft, tryCatch } from "fp-ts/lib/either";
import { OpenAPIObject } from "../src/generated/full";

interface IError {
  message: string;
}

type Try<T> = Either<IError, T>;

function parseYamlFileToObject(pathToFile: string): Try<any> {
  return tryCatch(
    () => {
      const contents = fs.readFileSync(pathToFile, "utf-8");
      return jsYaml.safeLoad(contents);
    },
    (e: unknown) => ({ message: `Error reading file: ${JSON.stringify(e)}` })
  );
}

// Need to define a helper with `mapLeft` to make errors compatible
const expandSpec = (spec: any): Try<OpenAPIObject> =>
  either.mapLeft(loas(spec), (error: any) => ({
    message: `Error parsing spec: ${JSON.stringify(error)}`,
  }));

// TODO Do piping with one `pipe(...)(pathToFile)`?
export default function expand(pathToFile: string): OpenAPIObject {
  const parsedSpec: Try<any> = parseYamlFileToObject(pathToFile);

  const specOrErrors: Try<OpenAPIObject> = either.chain(parsedSpec, expandSpec);

  return fold(
    (e: IError) => {
      throw Error(`Something went wrong: ${JSON.stringify(e)}`);
    },
    (openApiObject: OpenAPIObject) => {
      return openApiObject;
    }
  )(specOrErrors);
}
