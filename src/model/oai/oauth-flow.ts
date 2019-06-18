import { _is, _type, _choose } from "./util";

const isOAuthFlowObject = _is<OAuthFlowObject>(
  {
    authorizationUrl: "string",
    tokenUrl: "string",
    scopes: (v: any) =>
      typeof v === "object" &&
      Object.values(v)
        .map(i => typeof i === "string")
        .reduce((a, b) => a && b, true)
  },
  {
    refreshUrl: "string"
  }
);
export type OAuthFlowObject = {
  authorizationUrl: string;
  tokenUrl: string;
  scopes: { [key: string]: string };
  refreshUrl?: string;
};
export const OAuthFlowObject = _type<OAuthFlowObject>(
  "OAuthFlowObject",
  isOAuthFlowObject
);

const isOAuthFlowsObject = _is<OAuthFlowsObject>(
  {},
  {
    implicit: _choose([OAuthFlowObject]),
    password: _choose([OAuthFlowObject]),
    clientCredentials: _choose([OAuthFlowObject]),
    authorizationCode: _choose([OAuthFlowObject])
  }
);
export type OAuthFlowsObject = {
  implicit?: OAuthFlowObject;
  password?: OAuthFlowObject;
  clientCredentials?: OAuthFlowObject;
  authorizationCode?: OAuthFlowObject;
};
export const OAuthFlowsObject = _type<OAuthFlowsObject>(
  "OAuthFlowsObject",
  isOAuthFlowsObject
);
