import t from "io-ts";

import { _is, _type, _choose } from "./util";

const isServerVariableObject = _is<ServerVariableObject>(
  {
    default: "string",
    enum: (v: any, u: any) =>
      u.default &&
      u.enum &&
      u.enum instanceof Array &&
      u.enum.map((i: any) => typeof i === "string") &&
      u.enum.indexOf(u.default) !== -1
  },
  {
    description: "string"
  }
);

export type ServerVariableObject = {
  default: string;
  enum: string[];
  description?: string;
};

export const ServerVariableObject = _type(
  "ServerVariableObject",
  isServerVariableObject
);

const isServerVariablesObject = _is<ServerVariablesObject>(
  {
    url: "string"
  },
  {
    description: "string",
    variables: _choose([ServerVariableObject])
  }
);

export type ServerVariablesObject = {
  url: string;
  description?: string;
  variables?: { [key: string]: ServerVariableObject };
};

export const ServerVariablesObject = _type(
  "ServerVariablesObject",
  isServerVariablesObject
);
