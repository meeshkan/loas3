import { ReferenceObject } from "openapi3-ts";

export const isReference = (o: unknown): o is ReferenceObject =>
  o && typeof o === "object" && Object.keys(<object>o).indexOf("$ref") !== -1;
