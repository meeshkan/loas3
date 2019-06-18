import t from "io-ts";
import { SpecificationExtension } from "./specification-extension";

export const OAuthFlowObject = t.intersection([
  t.type({
    authorizationUrl: t.string,
    tokenUrl: t.string,
    scopes: t.record(t.string, t.string)
  }),
  t.partial({
    refreshUrl: t.string
  }),
  SpecificationExtension
]);
export type OAuthFlowObject = t.TypeOf<typeof OAuthFlowObject>;

export const OAuthFlowsObject = t.intersection([
  t.partial({
    implicit: OAuthFlowObject,
    password: OAuthFlowObject,
    clientCredentials: OAuthFlowObject,
    authorizationCode: OAuthFlowObject
  }),
  SpecificationExtension
]);
export type OAuthFlowsObject = t.TypeOf<typeof OAuthFlowsObject>;
