import loas from "../src";
import { mapRightOrThrow } from "./util";

const specWithResponseRef = {
  paths: {
    "/users": {
      options: {
        responses: {
          204: {
            $ref: "#/components/responses/Options"
          }
        }
      }
    }
  },
  components: {
    responses: {
      Options: {
        description: "Options response",
        content: {
          "text/plain": {
            schema: {
              type: "string"
            }
          }
        }
      }
    }
  }
};

const specWithoutDescription = {
  paths: {
    "/user": {
      get: {
        summary: "List user",
        responses: {
          "404": {
            // description: Not found
            content: {
              "text/plain": {
                schema: {
                  type: "string",
                  default: "Not found"
                }
              }
            }
          }
        }
      }
    }
  }
};

describe("loas", () => {
  it("should handle response object ref correctly", () => {
    const expandedSpecOrErrors = loas(specWithResponseRef);
    mapRightOrThrow(expandedSpecOrErrors, spec => {
      expect(spec).toHaveProperty(
        ["paths", "/users", "options", "responses", 204, "$ref"],
        "#/components/responses/Options"
      );
    });
  });

  it("should handle response object without description correctly", () => {
    const expandedSpecOrErrors = loas(specWithoutDescription);
    mapRightOrThrow(expandedSpecOrErrors, spec => {
      expect(spec).toHaveProperty("openapi");
      expect(spec).toHaveProperty(
        ["paths", "/user", "get", "responses", "404", "description"],
        "too lazy"
      );
      expect(spec).toHaveProperty(
        [
          "paths",
          "/user",
          "get",
          "responses",
          "404",
          "content",
          "text/plain",
          "schema",
          "default"
        ],
        "Not found"
      );
    });
  });
});
