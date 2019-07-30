import fs from "fs";
import loas from "../src";
import jsYaml from "js-yaml";
import { either, Either, fold, tryCatch } from "fp-ts/lib/either";
import { OpenAPIObject } from "../src/generated/full";

function parseYamlFileToObject(pathToFile: string): Either<unknown, any> {
  return tryCatch(
    () => {
      const contents = fs.readFileSync(pathToFile, "utf-8");
      return jsYaml.safeLoad(contents);
    },
    (e: unknown) => e
  );
}

export default function expand(pathToFile: string): OpenAPIObject {
  // TODO Do this with one `pipe(...)(pathToFile)`?
  const parsedSpec = parseYamlFileToObject(pathToFile);

  const specOrErrors: Either<unknown, OpenAPIObject> = either.chain(
    parsedSpec,
    loas
  );

  return fold(
    (e: unknown) => {
      throw Error(`Something went wrong: ${JSON.stringify(e)}`);
    },
    (openApiObject: OpenAPIObject) => {
      return openApiObject;
    }
  )(specOrErrors);
}
