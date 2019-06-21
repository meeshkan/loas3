import yaml from "js-yaml";
import loas3 from "../../src/";

test("lazy openapi fully expands", () => {
  expect(loas3(yaml.load(`paths: { '/foo': 1}`)).paths).toEqual({
    "/foo": {
      get: {
        responses: {
          default: {
            description: "too lazy",
            content: {
              "application/json": {
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
