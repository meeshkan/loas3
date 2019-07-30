import fs from "fs";
import yaml from "js-yaml";
import { mapRightOrThrow } from "./util";
import loas from "../src";

test("highly condensed schema validates", () => {
  const loasSpec = yaml.load(
    fs.readFileSync("./test/pet-store-lite.loas3.yml").toString()
  );
  const expandedSpecExpected = yaml.load(
    fs.readFileSync("./test/pet-store-lite.full.yml").toString()
  );
  const expandedSpec = loas(loasSpec);
  mapRightOrThrow(expandedSpec, spec => {
    expect(spec).toEqual(expandedSpecExpected);
  });
});
