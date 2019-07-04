import fs from "fs";
import yaml from "js-yaml";
import loas from "../src";
import { lazy } from "./util";

test("slack in, slack out", () => {
  const instance = yaml.load(fs.readFileSync("./test/slack.yml").toString());
  lazy(loas(instance), val => {
    expect(val).toEqual(instance);
  });
});
