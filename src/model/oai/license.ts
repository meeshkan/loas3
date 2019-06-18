import t from "io-ts";

export const LicenseObject = t.intersection([
  t.type({
    name: t.string
  }),
  t.partial({
    url: t.string
  })
]);
export type LicenseObject = t.TypeOf<typeof LicenseObject>;
