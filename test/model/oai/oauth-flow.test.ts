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
});
test("oauth-flow with incorrect field fails", () => {
  expect(
    OAuthFlowObject.is({
      authorizationUrl: "https://meeshkan.com",
      tokenUrl: "https://meeshkan.com",
      scopes: [],
      refreshUrl: 1
    })
  ).toBe(false);
});
test("oauth-flow with all correct fields succeeds", () => {
  expect(
    OAuthFlowObject.is({
      authorizationUrl: "https://meeshkan.com",
      tokenUrl: "https://meeshkan.com",
      scopes: ["a"],
      refreshUrl: "https://meeshkan.com"
    })
  ).toBe(true);
});
test("oauth flow with bad value fails", () => {
  expect(
    OAuthFlowObject.is({
      authorizationUrl: "https://meeshkan.com",
      tokenUrl: "https://meeshkan.com",
      scopes: [],
      refreshUrl: "https://meeshkan.com",
      bad: 1
    })
  ).toBe(false);
});
test("oauth value with non-string scopes fails", () => {
  expect(
    OAuthFlowObject.is({
      authorizationUrl: "https://meeshkan.com",
      tokenUrl: "https://meeshkan.com",
      scopes: ["a", 1],
      refreshUrl: "https://meeshkan.com"
    })
  ).toBe(false);
});
test("oauth value with x- field passes", () => {
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

test("oauth flows objects validates with correct fields", () => {
  expect(
    OAuthFlowsObject.is({
      implicit: {
        authorizationUrl: "https://meeshkan.com",
        tokenUrl: "https://meeshkan.com",
        scopes: []
      }
    })
  ).toBe(true);
});
test("oauth flows with incorrect field fails", () => {
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
});
test("oauth flows with x- field fails", () => {
  expect(
    OAuthFlowsObject.is({
      implicit: {
        authorizationUrl: "https://meeshkan.com",
        tokenUrl: "https://meeshkan.com",
        scopes: []
      },
      "x-foo": "a"
    })
  ).toBe(true);
});
test("oauth flows with incorrect oauth fails", () => {
  expect(
    OAuthFlowsObject.is({
      implicit: {
        authorizationUrl: "https://meeshkan.com",
        tokenUrl: "https://meeshkan.com"
      }
    })
  ).toBe(false);
});
