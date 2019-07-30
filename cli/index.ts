import fs from "fs";
import loas from "../src";
import jsYaml from "js-yaml";
import { fold } from "fp-ts/lib/either";
import { OpenAPIObject } from "../src/generated/full";

async function main() {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    throw Error("Expected one argument");
  }

  const pathToFile = args[0];

  const contents = fs.readFileSync(pathToFile, "utf-8");
  const parsed = jsYaml.safeLoad(contents);
  const expandedSpecOrErrors = loas(parsed);

  fold(
    (err: any) => {
      throw err;
    },
    (openApiObject: OpenAPIObject) => {
      console.log(openApiObject);
    }
  )(expandedSpecOrErrors);
}

(async () => {
  try {
    await main();
  } catch (err) {
    console.error(err);
  }
})();
