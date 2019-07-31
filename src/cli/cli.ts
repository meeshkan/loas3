import fs from "fs";
import loas from "..";
import jsYaml from "js-yaml";
import { chain, map, mapLeft, Either, fold, tryCatch } from "fp-ts/lib/Either";
import { OpenAPIObject } from "../generated/full";
import { pipe } from "fp-ts/lib/pipeable";
import { ErrorObject } from "ajv";
import { error, log } from "fp-ts/lib/Console";

// Generic error in CLI
export interface ICliError {
  message: string;
}

type Try<T> = Either<ICliError, T>;

/**
 * Return a side-effect that logs to console.
 */
export function processArgs(): () => void {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    return error("Expected one argument");
  }

  const pathToFile = args[0];

  const expandedSpec: Try<OpenAPIObject> = processFile(pathToFile);

  const logToConsole: () => void = pipe(
    expandedSpec,
    map((spec: OpenAPIObject) => jsYaml.safeDump(spec)),
    fold(error, log)
  );

  return logToConsole;
}

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
    mapLeft((error: ErrorObject[]) => ({
      message: `Error parsing spec: ${JSON.stringify(error)}`
    }))
  );

/**
 * Expand LOAS specification to OpenAPI object
 * @param pathToFile Path to file
 * @return OpenAPIObject or error
 */
export function processFile(pathToFile: string): Try<OpenAPIObject> {
  return pipe(
    pathToFile,
    parseYamlFileToObject,
    chain(expandSpec)
  );
}
