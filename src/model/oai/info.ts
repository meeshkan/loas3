import t from "io-ts";
import { ContactObject } from "./contact";
import { LicenseObject } from "./license";

export const InfoObject = t.intersection([
  t.type({
    title: t.string,
    version: t.string
  }),
  t.partial({
    description: t.string,
    termsOfService: t.string,
    contact: ContactObject,
    license: LicenseObject
  })
]);
export type InfoObject = t.TypeOf<typeof InfoObject>;
