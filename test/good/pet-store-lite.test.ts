import fs from "fs";
import yaml from "js-yaml";
import { lazy } from "./util";
import loas from "../../src";

test("highly condensed schema validates", () => {
  const instance = yaml.load(
    fs.readFileSync("./test/good/pet-store-lite.loas3.yml").toString()
  );
  const expanded = yaml.load(
    fs.readFileSync("./test/good/pet-store-lite.full.yml").toString()
  );
  lazy(loas(instance), val => {
    expect(val).toEqual(expanded);
  });
});
