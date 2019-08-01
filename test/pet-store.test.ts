import loas from "../src";
import { loadYaml, mapRightOrThrow } from "./util";

test("processing on unlazy schema is a no-op", () => {
  const loasSpec = loadYaml("./test/pet-store.yml");
  const expandedSpecOrErrors = loas(loasSpec);
  mapRightOrThrow(expandedSpecOrErrors, spec => {
    expect(spec).toEqual(loasSpec);
  });
});
