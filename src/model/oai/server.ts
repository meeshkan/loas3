import t from "io-ts";


const ServerVariableObject = t.intersection([
    t.type({
        default: t.string,
        enum: t.array(t.string),
    }),
    t.partial({
        description: t.string,
    })
]);  

export const ServerObject = t.intersection([
   t.type({
       url: t.string,
   }),
   t.partial({
       description: t.string,
       variables: t.record(t.string, ServerVariableObject),
   })
]);

export type ServerObject = t.TypeOf<typeof ServerObject>;