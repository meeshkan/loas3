import loas from "../src";
import { loadYaml, mapRightOrThrow } from "./util";

test("stripe in, stripe out", () => {
  const spec = loadYaml("./test/stripe.yml");
  const expandedSpecOrErrors = loas(spec);
  mapRightOrThrow(expandedSpecOrErrors, val => {
    expect(val).toEqual(spec);
  });
});
