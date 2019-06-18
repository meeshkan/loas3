import t from "io-ts";
import { SpecificationExtension } from "./specification-extension";

export const ExampleObject = t.intersection([
  t.partial({
    summary: t.string,
    description: t.string,
    value: t.any,
    externalValue: t.string
  }),
  SpecificationExtension
]);
export type ExampleObject = t.TypeOf<typeof ExampleObject>;

export const ExamplesObject = t.record(t.string, ExampleObject);
export type ExamplesObject = t.TypeOf<typeof ExamplesObject>;
