import { fold } from "fp-ts/lib/Either";
import expandSpec from "../../src/cli/expand-spec-file";
import { OpenAPIObject } from "../../src/generated/full";

describe("Expanding LOAS spec", () => {
  it("should expand petstore", () => {
    const pathToFile = "./test/pet-store-lite.loas3.yml";
    const openApiObjectOrError = expandSpec(pathToFile);
    fold(
      (err: unknown) => {
        throw err;
      },
      (openAPIObject: OpenAPIObject) => {
        expect(openAPIObject).toBeDefined();
      }
    )(openApiObjectOrError);
  });
});
