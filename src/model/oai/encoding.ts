import { _is, _type, _choose_val } from "./util";
import { ReferenceObject } from "./reference";
import { KnownHeaderObject } from "./parameter";

const isEncodingObject = _is<EncodingObject>(
  {},
  {
    contentType: "string",
    headers: _choose_val([KnownHeaderObject, ReferenceObject]),
    style: "string",
    explode: "boolean",
    allowReserved: "boolean"
  }
);
export type EncodingObject = {
  contentType?: string;
  headers?: { [key: string]: KnownHeaderObject | ReferenceObject };
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
};
export const EncodingObject = _type<EncodingObject>(
  "EncodingObject",
  isEncodingObject
);
