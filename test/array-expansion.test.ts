import { loadYaml, mapRightOrThrow } from "./util";
import loas from "../src";

test("array expansion uses first member as object tempalte", () => {
  const loasSpec = loadYaml("./test/array-expansion.loas3.yml");
  const expandedSpecExpected = loadYaml("./test/array-expansion.full.yml");
  const expandedSpec = loas(loasSpec);
  mapRightOrThrow(expandedSpec, spec => {
    expect(spec).toEqual(expandedSpecExpected);
  });
});
