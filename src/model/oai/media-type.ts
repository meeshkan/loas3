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
    example: _ => true,
    examples: v => _choose_val([ExampleObject, ReferenceObject])(v),
    encoding: _choose_val([EncodingObject])
  }
);

export type MediaTypeObject = {
  schema: SchemaObject;
  example?: any;
  examples?: { [key: string]: ExampleObject | ReferenceObject };
  encoding?: { [key: string]: EncodingObject };
};
export const MediaTypeObject = _type<MediaTypeObject>(
  "MediaTypeObject",
  isMediaTypeObject
);
