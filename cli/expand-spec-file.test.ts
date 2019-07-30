import expandSpec from "./expand-spec-file";

describe("Expanding LOAS spec", () => {
  it("should expand petstore", () => {
    const pathToFile = "test/pet-store-lite.loas3.yml";
    const openAPIObject = expandSpec(pathToFile);
    expect(openAPIObject).toHaveProperty("openapi");
  });
});
