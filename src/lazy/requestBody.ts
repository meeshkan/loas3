import { $RequestBodyObject, $ContentObject } from "../model/LazyOpenApi";
import { RequestBodyObject } from "../model/OpenApi";
import content from "./content";

// adds query, header, path, cookie to spec
const OAPI30_REQUEST_BODY_KEYS = new Set(["description", "required", "content"]);
export default (o: $RequestBodyObject): RequestBodyObject =>
  (typeof o !== "object" || Object.keys(o as object).filter(a => OAPI30_REQUEST_BODY_KEYS.has(a)).length === 0) ?
  {
    content: content(o),
  } :
  {
      ...o,
      content: content((o as RequestBodyObject).content as $ContentObject),
  } as RequestBodyObject;