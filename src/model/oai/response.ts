import t from "io-ts";
import { SpecificationExtension } from "./specification-extension";
import { MediaTypeObject } from "./media-type";
import { LinksObject } from "./link";
import { KnownHeaderObject } from "./parameter";
import { ReferenceObject } from "./reference";

export const ResponseObject = t.intersection([
  t.type({
    description: t.string
  }),
  t.partial({
    content: t.record(t.string, MediaTypeObject),
    headers: t.record(t.string, t.union([KnownHeaderObject, ReferenceObject])),
    links: LinksObject
  }),
  SpecificationExtension
]);
export type ResponseObject = t.TypeOf<typeof ResponseObject>;

export const ResponsesObject = t.intersection([
  t.record(
    // literal 200 due to hack because of [Mixed, Mixed, ...Mixed[]]
    t.union([
      t.literal("default"),
      t.literal("200"),
      ...new Array(399).fill(null).map(i => t.literal(`${201 + i}`))
    ]),
    ResponseObject
  ),
  SpecificationExtension
]);
export type ResponsesObject = t.TypeOf<typeof ResponsesObject>;
