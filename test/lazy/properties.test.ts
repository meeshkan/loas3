import yaml from "js-yaml";
import loas3 from "../../src/";

test("lazy openapi correctly represents objects", () => {
  expect(
    loas3(
      yaml.load(`paths:
    '/foo':
        post:
            responses:
                200:
                  a: b
                  c: d
`)
    ).paths
  ).toEqual({
    ["/foo"]: {
      post: {
        responses: {
          200: {
            description: "too lazy",
            content: {
              ["application/json"]: {
                schema: {
                  type: "object",
                  properties: {
                    a: {
                      type: "string",
                      default: "b"
                    },
                    c: {
                      type: "string",
                      default: "d"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });
});

test("lazy openapi correctly represents arrays", () => {
  expect(
    loas3(
      yaml.load(`paths:
    '/foo':
        post:
            responses:
                200: [b]
`)
    ).paths
  ).toEqual({
    ["/foo"]: {
      post: {
        responses: {
          200: {
            description: "too lazy",
            content: {
              ["application/json"]: {
                schema: {
                  type: "array",
                  items: {
                    type: "string",
                    default: "b"
                  }
                }
              }
            }
          }
        }
      }
    }
  });
});
