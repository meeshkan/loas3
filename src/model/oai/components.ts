import t from "io-ts";
import { SpecificationExtension } from "./specification-extension";
import { OperationObject } from "./operation";
import { ReferenceObject } from "./reference";
import { ServerObject } from "./server";
import { ParameterObject, HeaderObject } from "./parameter";
import { SchemaObject } from "./schema";
import { ResponseObject } from "./response";
import { ExampleObject } from "./examples";
import { RequestBodyObject } from "./requestBody";
import { SecuritySchemeObject } from "./security-scheme";
import { LinkObject } from "./link";

// TODO: callbacks
export const ComponentsObject = t.intersection([
    t.partial({
        schemas: t.record(t.string, t.union([SchemaObject, ReferenceObject])),
        responses: t.record(t.string, t.union([ResponseObject, ReferenceObject])),
        parameters: t.record(t.string, t.union([ParameterObject, ReferenceObject])),
        examples: t.record(t.string, t.union([ExampleObject, ReferenceObject])),
        requestBodies: t.record(t.string, t.union([RequestBodyObject, ReferenceObject])),
        headers: t.record(t.string, t.union([HeaderObject, ReferenceObject])),
        securitySchemas: t.record(t.string, t.union([SecuritySchemeObject, ReferenceObject])),
        links: t.record(t.string, t.union([LinkObject, ReferenceObject])),
    }),
    SpecificationExtension
]);
export type ComponentsObject = t.TypeOf<typeof ComponentsObject>;

