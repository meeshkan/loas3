import yaml from "js-yaml";
import loai3 from "../../src/index";

test("lazy openapi fully expands", () => {
  expect(loai3(yaml.load(`paths: { '/foo': 1}`)).paths).toEqual({
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
      }
    }
  });
});
