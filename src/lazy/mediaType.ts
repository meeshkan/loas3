import { $MediaTypeObject, $SchemaObject } from "../model/LazyOpenApi";
import { MediaTypeObject, ReferenceObject } from "openapi3-ts";
import { isReference } from "./reference";
import schema, { isTopLevelSchema } from "./schema";

// for now, if we can't find a schema, expand
export default (o: $MediaTypeObject): MediaTypeObject =>
  typeof o === "object" && isTopLevelSchema((<any>o).schema)
    ? { ...(<MediaTypeObject>o), schema: (<any>o).schema }
    : typeof o === "object" && isReference((<any>o).schema)
    ? { ...(<MediaTypeObject>o), schema: (<any>o).schema }
    : typeof o === "object" && isTopLevelSchema(<any>o)
    ? { ...(<MediaTypeObject>o), schema: <any>o }
    : typeof o === "object" && isReference(<any>o)
    ? { ...(<MediaTypeObject>o), schema: <any>o }
    : {
        schema: schema(o)
      };
