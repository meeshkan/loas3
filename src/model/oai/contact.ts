import * as t from "io-ts";

export const ContactObject = t.partial({
  name: t.string,
  url: t.string,
  email: t.string
});
export type ContactObject = t.TypeOf<typeof ContactObject>;
