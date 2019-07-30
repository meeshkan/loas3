import fs from "fs";
import yaml from "js-yaml";
import loas from "../src";
import { mapRightOrThrow } from "./util";

test("stripe in, stripe out", () => {
  const spec = yaml.load(fs.readFileSync("./test/stripe.yml").toString());
  const expandedSpecOrErrors = loas(spec);
  mapRightOrThrow(expandedSpecOrErrors, val => {
    expect(val).toEqual(spec);
  });
});
