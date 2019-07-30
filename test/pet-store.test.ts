import fs from "fs";
import yaml from "js-yaml";
import loas from "../src";
import { mapRightOrThrow } from "./util";

test("processing on unlazy schema is a no-op", () => {
  const loasSpec = yaml.load(
    fs.readFileSync("./test/pet-store.yml").toString()
  );
  const expandedSpecOrErrors = loas(loasSpec);
  mapRightOrThrow(expandedSpecOrErrors, spec => {
    expect(spec).toEqual(loasSpec);
  });
});
