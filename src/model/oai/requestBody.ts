import { MediaTypeObject } from "./media-type";

import { _is, _type, _choose_val } from "./util";

const isRequestBody = _is<RequestBodyObject>(
  { content: _choose_val([MediaTypeObject]) },
  { description: "string", required: "boolean" }
);
export type RequestBodyObject = {
  content: { [key: string]: MediaTypeObject };
  description?: string;
  required?: boolean;
};
export const RequestBodyObject = _type<RequestBodyObject>(
  "RequestBodyObject",
  isRequestBody
);
