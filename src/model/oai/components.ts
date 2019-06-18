import { ReferenceObject } from "./reference";
import { ParameterObject, KnownHeaderObject } from "./parameter";
import { SchemaObject } from "./schema";
import { ResponseObject } from "./response";
import { ExampleObject } from "./example";
import { RequestBodyObject } from "./requestBody";
import { SecuritySchemeObject } from "./security-scheme";
import { LinkObject } from "./link";
import { _is, _type, _choose_val } from "./util";

// TODO: callbacks
export const isComponentsObject = _is<ComponentsObject>(
  {},
  {
    schemas: _choose_val([SchemaObject, ReferenceObject]),
    responses: _choose_val([ResponseObject, ReferenceObject]),
    parameters: _choose_val([ParameterObject, ReferenceObject]),
    examples: _choose_val([ExampleObject, ReferenceObject]),
    requestBodies: _choose_val([RequestBodyObject, ReferenceObject]),
    headers: _choose_val([KnownHeaderObject, ReferenceObject]),
    securitySchemas: _choose_val([SecuritySchemeObject, ReferenceObject]),
    links: _choose_val([LinkObject, ReferenceObject])
  }
);
export type ComponentsObject = {
  schemas?: { [key: string]: SchemaObject | ReferenceObject };
  responses?: { [key: string]: ResponseObject | ReferenceObject };
  parameters?: { [key: string]: ParameterObject | ReferenceObject };
  examples?: { [key: string]: ExampleObject | ReferenceObject };
  requestBodies?: { [key: string]: RequestBodyObject | ReferenceObject };
  headers?: { [key: string]: KnownHeaderObject | ReferenceObject };
  securitySchemas?: { [key: string]: SecuritySchemeObject | ReferenceObject };
  links?: { [key: string]: LinkObject | ReferenceObject };
};
export const ComponentsObject = _type<ComponentsObject>(
  "ComponentsObject",
  isComponentsObject
);
