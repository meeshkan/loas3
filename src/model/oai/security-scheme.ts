import t from "io-ts";
import { OAuthFlowsObject } from "./oauth-flow";
import { SpecificationExtension } from "./specification-extension";

export const SecuritySchemeObject = t.intersection([
    t.type({
        type: t.string,
        name: t.string,
        in: t.string,
        scheme: t.string,
        flows: OAuthFlowsObject,
        openIdConnectUrl: t.string
    }),
    t.partial({
        bearerFormat: t.string,
        description: t.string
    }),
    SpecificationExtension
]);
export type SecuritySchemeObject = t.TypeOf<typeof SecuritySchemeObject>;
