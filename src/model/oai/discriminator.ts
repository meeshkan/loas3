import t from "io-ts";

export const DiscriminatorObject = t.intersection([
    t.type({
        propertyName: t.string
    }),
    t.partial({
        mapping: t.record(t.string, t.string)
    })
]);
export type DiscriminatorObject = t.TypeOf<typeof DiscriminatorObject>;
