import fs from "fs";
import yaml from "js-yaml";
import loas from "../src";
import { mapRightOrThrow } from "./util";

test("slack in, slack out", () => {
  const spec = yaml.load(fs.readFileSync("./test/slack.yml").toString());
  const expandedSpecOrErrors = loas(spec);
  mapRightOrThrow(expandedSpecOrErrors, spec => {
    expect(spec).toEqual(spec);
  });
});
