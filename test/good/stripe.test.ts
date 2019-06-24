import fs from "fs";
import yaml from "js-yaml";
import loas from "../../src";
import { lazy } from "./util";

test("stripe in, stripe out", () => {
  const instance = yaml.load(
    fs.readFileSync("./test/good/stripe.yml").toString()
  );
  lazy(loas(instance), val => {
    expect(val).toEqual(instance);
  });
});
