import t from "io-ts";
import { MediaTypeObject } from "./media-type";
import { LinksObject } from "./link";
import { KnownHeaderObject } from "./parameter";
import { ReferenceObject } from "./reference";
import { _is, _type, _choose_val, _choose } from "./util";

const isResponseObject = _is<ResponseObject>(
  { description: "string" },
  {
    content: _choose_val([MediaTypeObject]),
    headers: _choose_val([KnownHeaderObject, ReferenceObject]),
    links: _choose([LinksObject])
  }
);

export type ResponseObject = {
  description: string;
  content?: { [key: string]: MediaTypeObject };
  headers?: { [key: string]: KnownHeaderObject | ReferenceObject };
  links?: LinksObject;
};

export const ResponseObject = _type<ResponseObject>(
  "ResponseObject",
  isResponseObject
);

const codes = [
  "default",
  ...new Array(600 - 200).fill(null).map((i, j) => j + 200)
];
const isResponsesObject = (u: unknown): u is ResponsesObject =>
  u &&
  typeof u === "object" &&
  new Set([...codes, ...Object.keys(u as any)]).size === codes.length &&
  Object.values(u as any)
    .map(i => ResponseObject.is(i))
    .reduce((a, b) => a && b, true);

export type ResponsesObject = { [key: string]: ResponseObject };

export const ResponsesObject = _type<ResponsesObject>(
  "ResponsesObject",
  isResponsesObject
);
