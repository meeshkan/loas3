import jsYaml from "js-yaml";
import { OpenAPIObject } from "../src/generated/full";
import expand from "./expand-spec-file";

function main() {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    throw Error("Expected one argument");
  }

  const pathToFile = args[0];

  const expandedSpec: OpenAPIObject = expand(pathToFile);
  console.log(jsYaml.safeDump(expandedSpec));
}

(() => {
  try {
    main();
  } catch (err) {
    console.error(err);
  }
})();
