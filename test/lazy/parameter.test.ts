import yaml from "js-yaml";
import loai3 from "../../src/index";

test("lazy openapi correctly expands parameters", () => {
  expect(
    loai3(
      yaml.load(`paths:
    '/foo/{id}':
        get:
            parameters:
                id: 3
                bar: baz
            responses:
                200: 1
`)
    ).paths
  ).toEqual({
    ["/foo/{id}"]: {
      get: {
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "integer",
              format: "int64",
              default: 3
            }
          },
          {
            name: "bar",
            in: "query",
            schema: {
              type: "string",
              default: "baz"
            }
          }
        ],
        responses: {
          200: {
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
      }
    }
  });
});
