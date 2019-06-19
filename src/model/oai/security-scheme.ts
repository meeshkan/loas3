import { OAuthFlowsObject } from "./oauth-flow";
import { _is, _type, _choose } from "./util";

const isSecuritySchemeObject = _is<SecuritySchemeObject>(
  {
    type: "string",
    name: "string",
    in: "string",
    scheme: "string",
    flows: _choose([OAuthFlowsObject]),
    openIdConnectUrl: "string"
  },
  {
    bearerFormat: "string",
    description: "string"
  }
);

export type SecuritySchemeObject = {
  type: string;
  name: string;
  in: string;
  scheme: string;
  flows: OAuthFlowsObject;
  openIdConnectUrl: string;
  bearerFormat?: string;
  description?: string;
};

export const SecuritySchemeObject = _type(
  "SecuritySchemeObject",
  isSecuritySchemeObject
);
