import { _is, _type, _choose } from "./util";

const isXMLObject = _is<XMLObject>(
  {},
  {
    name: "string",
    namespace: "string",
    prefix: "string",
    attribute: "boolean",
    wrapped: "boolean"
  }
);

export type XMLObject = {
  name?: string;
  namespace?: string;
  prefix?: string;
  attribute?: boolean;
  wrapped?: boolean;
};

export const XMLObject = _type("XMLObject", isXMLObject);
