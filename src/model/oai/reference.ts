import t from "io-ts";

export const ReferenceObject = t.type({
    $ref: t.string
});
export type ReferenceObject = t.TypeOf<typeof ReferenceObject>;
