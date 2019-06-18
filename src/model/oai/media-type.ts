import { SchemaObject } from "./schema";
import { ExampleObject } from "./example";
import { EncodingObject } from "./encoding";
import { ReferenceObject } from "./reference";
import { _is, _type, _choose, _choose_val } from "./util";

const isMediaTypeObject = _is<MediaTypeObject>(
  {
    schema: _choose([SchemaObject])
  },
  {
    example: "object",
    examples: v =>
      _choose_val([ExampleObject])(v) ||
      _choose([ReferenceObject])(v) ||
      typeof v === "string",
    encoding: _choose_val([EncodingObject])
  }
);

export type MediaTypeObject = {
  schema: SchemaObject;
  example?: any;
  examples?: { [key: string]: ExampleObject } | ReferenceObject | string;
  encoding?: EncodingObject;
};
export const MediaTypeObject = _type<MediaTypeObject>(
  "MediaTypeObject",
  isMediaTypeObject
);
