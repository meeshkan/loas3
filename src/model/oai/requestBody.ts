import t from "io-ts";
import { SpecificationExtension } from "./specification-extension";
import { MediaTypeObject } from "./media-type";

export const RequestBodyObject = t.intersection([
  t.type({
    content: t.record(t.string, MediaTypeObject)
  }),
  t.partial({
    description: t.string,
    required: t.boolean
  }),
  SpecificationExtension
]);

export type RequestBodyObject = t.TypeOf<typeof RequestBodyObject>;
