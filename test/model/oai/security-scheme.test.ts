import { SecuritySchemeObject } from "../../../src/model/oai/security-scheme";

test("empty security scheme object fails", () => {
  expect(SecuritySchemeObject.is({})).toBe(false);
});

test("security scheme object with no optional params passes", () => {
  expect(
    SecuritySchemeObject.is({
      type: "foo",
      name: "bar",
      in: "hello",
      scheme: "world",
      flows: {},
      openIdConnectUrl: "none"
      //bearerFormat?: string | undefined;
      //description?: string | undefined;
    })
  ).toBe(true);
});

test("security scheme object with optional params passes", () => {
  expect(
    SecuritySchemeObject.is({
      type: "foo",
      name: "bar",
      in: "hello",
      scheme: "world",
      flows: {},
      openIdConnectUrl: "none",
      bearerFormat: "fw",
      description: "xyz"
    })
  ).toBe(true);
});
