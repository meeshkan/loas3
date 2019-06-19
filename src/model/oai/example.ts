import { _is, _type } from "./util";

export const isExampleObject = _is<ExampleObject>(
  {},
  {
    summary: "string",
    description: "string",
    value: _ => true,
    externalValue: "string"
  }
);
export type ExampleObject = {
  summary?: string;
  description?: string;
  value?: any;
  externalValue?: string;
};
export const ExampleObject = _type<ExampleObject>(
  "ExampleObject",
  isExampleObject
);
