#!/usr/bin/env node
import jsYaml from "js-yaml";
import { OpenAPIObject } from "../generated/full";
import expand from "./expand-spec-file";
import { ILoasError } from "./interfaces";
import { Either, fold, map } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import { error, log } from "fp-ts/lib/Console";

function processArgs(): () => void {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    throw Error("Expected one argument");
  }

  const pathToFile = args[0];

  const expandedSpec: Either<ILoasError, OpenAPIObject> = expand(pathToFile);

  const logToConsole: () => void = pipe(
    expandedSpec,
    map((spec: OpenAPIObject) => jsYaml.safeDump(spec)),
    fold(error, log)
  );

  return logToConsole;
}

processArgs()();
