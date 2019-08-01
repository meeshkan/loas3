import { loadYaml, mapRightOrThrow } from "./util";
import loas from "../src";

test("highly condensed schema validates", () => {
  const loasSpec = loadYaml("./test/pet-store-lite.loas3.yml");
  const expandedSpecExpected = loadYaml("./test/pet-store-lite.full.yml");
  const expandedSpec = loas(loasSpec);
  mapRightOrThrow(expandedSpec, spec => {
    expect(spec).toEqual(expandedSpecExpected);
  });
});
