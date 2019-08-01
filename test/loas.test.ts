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
});
