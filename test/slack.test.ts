import loas from "../src";
import { loadYaml, mapRightOrThrow } from "./util";

test("slack in, slack out", () => {
  const spec = loadYaml("./test/slack.yml");
  const expandedSpecOrErrors = loas(spec);
  mapRightOrThrow(expandedSpecOrErrors, spec => {
    expect(spec).toEqual(spec);
  });
});
