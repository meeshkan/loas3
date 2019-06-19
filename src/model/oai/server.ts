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

const isServerObject = _is<ServerObject>(
  {
    url: "string"
  },
  {
    description: "string",
    variables: _choose([ServerVariableObject])
  }
);

export type ServerObject = {
  url: string;
  description?: string;
  variables?: { [key: string]: ServerVariableObject };
};

export const ServerObject = _type(
  "ServerObject",
  isServerObject
);
