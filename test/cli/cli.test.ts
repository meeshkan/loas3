import { fold } from "fp-ts/lib/Either";
import { processFile } from "../../src/cli/cli";
import { OpenAPIObject } from "../../src/generated/full";

describe("Expanding LOAS spec", () => {
  it("should expand petstore", () => {
    const pathToFile = "./test/pet-store-lite.loas3.yml";
    const openApiObjectOrError = processFile(pathToFile);
    fold(
      (err: unknown) => {
        throw err;
      },
      (openAPIObject: OpenAPIObject) => {
        expect(openAPIObject).toHaveProperty("openapi");
      }
    )(openApiObjectOrError);
  });
  it("should return error for file that does not exist", () => {
    const pathToFile = "./i-sure-hope-this-does-not-exist.yml";
    const openApiObjectOrError = processFile(pathToFile);
    fold(
      (err: unknown) => {
        expect(err).toHaveProperty("message");
      },
      (_: OpenAPIObject) => {
        throw Error("Was expected to return an error");
      }
    )(openApiObjectOrError);
  });
});
