import yaml from "js-yaml";
import loas3 from "../../src/";

test("lazy openapi correctly expands operations", () => {
  expect(
    loas3(
      yaml.load(`paths:
    '/foo':
        get: 1
        post:
            responses:
                200: foo
`)
    ).paths
  ).toEqual({
    ["/foo"]: {
      get: {
        responses: {
          default: {
            description: "too lazy",
            content: {
              ["application/json"]: {
                schema: {
                  type: "integer",
                  format: "int64",
                  default: 1
                }
              }
            }
          }
        }
      },
      post: {
        responses: {
          200: {
            description: "too lazy",
            content: {
              ["application/json"]: {
                schema: {
                  type: "string",
                  default: "foo"
                }
              }
            }
          }
        }
      }
    }
  });
});
