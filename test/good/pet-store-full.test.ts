import fs from "fs";
import yaml from "js-yaml";
import loas from "../../src/";
import { lazy } from "./util";

test("processing on unlazy schema is a no-op", () => {
  const instance = yaml.load(
    fs.readFileSync("./test/good/pet-store-full.yml").toString()
  );
  lazy(loas(instance), val => {
    expect(val).toEqual(instance);
  });
});
