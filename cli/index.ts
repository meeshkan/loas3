import fs from "fs";
import loas from "../src";
import jsYaml from "js-yaml";
import { Either, fold } from "fp-ts/lib/either";
import { ErrorObject } from "ajv";
import { OpenAPIObject } from "../src/generated/full";

function parse(pathToFile: string): Either<ErrorObject[], OpenAPIObject> {
  const contents = fs.readFileSync(pathToFile, "utf-8");
  const parsed = jsYaml.safeLoad(contents);
  return loas(parsed);
}

function main(): void {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    throw Error("Expected one argument");
  }

  const pathToFile = args[0];

  const specOrErrors = parse(pathToFile);

  fold(
    (err: any) => {
      throw err;
    },
    (openApiObject: OpenAPIObject) => {
      console.log(jsYaml.safeDump(openApiObject));
    }
  )(specOrErrors);
}

(() => {
  try {
    main();
  } catch (err) {
    console.error(err);
  }
})();
