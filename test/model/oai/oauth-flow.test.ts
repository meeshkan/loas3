import {
  OAuthFlowObject,
  OAuthFlowsObject
} from "../../../src/model/oai/oauth-flow";

test("oauth flow object validates", () => {
  expect(
    OAuthFlowObject.is({
      authorizationUrl: "https://meeshkan.com",
      tokenUrl: "https://meeshkan.com",
      scopes: []
    })
  ).toBe(true);
  expect(
    OAuthFlowObject.is({
      authorizationUrl: "https://meeshkan.com",
      tokenUrl: "https://meeshkan.com",
      scopes: [],
      refreshUrl: 1
    })
  ).toBe(false);
  expect(
    OAuthFlowObject.is({
      authorizationUrl: "https://meeshkan.com",
      tokenUrl: "https://meeshkan.com",
      scopes: [],
      refreshUrl: "https://meeshkan.com"
    })
  ).toBe(true);
  expect(
    OAuthFlowObject.is({
      authorizationUrl: "https://meeshkan.com",
      tokenUrl: "https://meeshkan.com",
      scopes: [],
      refreshUrl: "https://meeshkan.com",
      bad: 1
    })
  ).toBe(false);
  expect(
    OAuthFlowObject.is({
      authorizationUrl: "https://meeshkan.com",
      tokenUrl: "https://meeshkan.com",
      scopes: ["a", 1],
      refreshUrl: "https://meeshkan.com"
    })
  ).toBe(false);
  expect(
    OAuthFlowObject.is({
      authorizationUrl: "https://meeshkan.com",
      tokenUrl: "https://meeshkan.com",
      scopes: ["a", "b"],
      refreshUrl: "https://meeshkan.com",
      "x-bad": 1
    })
  ).toBe(true);
});

test("oauth flows object", () => {
  expect(
    OAuthFlowsObject.is({
      implicit: {
        authorizationUrl: "https://meeshkan.com",
        tokenUrl: "https://meeshkan.com",
        scopes: []
      }
    })
  ).toBe(true);
  expect(
    OAuthFlowsObject.is({
      implicit: {
        authorizationUrl: "https://meeshkan.com",
        tokenUrl: "https://meeshkan.com",
        scopes: []
      },
      foo: "a"
    })
  ).toBe(false);
  expect(
    OAuthFlowsObject.is({
      implicit: {
        authorizationUrl: "https://meeshkan.com",
        tokenUrl: "https://meeshkan.com"
      }
    })
  ).toBe(false);
});
