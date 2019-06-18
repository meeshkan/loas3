import t from "io-ts";
import { SpecificationExtension } from "./specification-extension";
import { OperationObject } from "./operation";
import { ReferenceObject } from "./reference";
import { ServerObject } from "./server";
import { ParameterObject } from "./parameter";

const PathItemObject = t.intersection([
    t.union([
        t.partial({
            summary: t.string,
            description: t.string,
            servers: t.array(ServerObject),
            parameters: t.array(t.union([ParameterObject, ReferenceObject])),
            get: OperationObject,
            put: OperationObject,
            post: OperationObject,
            delete: OperationObject,
            trace: OperationObject,
            options: OperationObject,
            head: OperationObject,
            patch: OperationObject
        }),
        ReferenceObject
    ]),
    SpecificationExtension
]);
type PathItemObject = t.TypeOf<typeof PathItemObject>;

export const PathsObject = t.record(t.string, PathItemObject);
type PathsObject = t.TypeOf<typeof PathsObject>;
