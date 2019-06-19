import t from "io-ts";
import { ServerObject } from "./server";
import { SpecificationExtension } from "./specification-extension";
import { ReferenceObject } from "./reference";
import { _is, _type } from "./util";

export const isBaseLinkObject = {
  parameters: (_: any) => true, // is this correct?
  requestBody: (_: any) => true,
  description: (_: any) => true,
  server: (v: any) => v && typeof v === "object" && ServerObject.is(v)
};

const isOperationRefObject = _is({ operationRef: "string" }, isBaseLinkObject);
type OperationRefObject = {
  operationRef: string;
  parameters: any; // is this correct?
  requestBody: any;
  description: any;
  server: ServerObject;
};

const isOperationIdObject = _is({ operationId: "string" }, isBaseLinkObject);
type OperationIdObject = {
  operationId: string;
  parameters: any; // is this correct?
  requestBody: any;
  description: any;
  server: ServerObject;
};

export type LinkObject =
  | OperationIdObject
  | OperationRefObject
  | ReferenceObject;
const isLinkObject = (u: unknown): u is LinkObject =>
  u &&
  typeof u === "object" &&
  (isOperationRefObject(u) || isOperationIdObject(u) || ReferenceObject.is(u));

export const LinkObject = _type<LinkObject>("LinkObject", isLinkObject);

const isLinksObject = (u: unknown): u is LinksObject =>
  u &&
  typeof u === "object" &&
  Object.values(u as any)
    .map(i => isLinkObject(i))
    .reduce((a, b) => a && b, true);

export type LinksObject = { [key: string]: LinkObject };
export const LinksObject = _type<LinksObject>("LinksObject", isLinksObject);
