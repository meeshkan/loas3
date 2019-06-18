import { _is, _type } from "./util";

export const isContactObject = _is<ContactObject>(
  {},
  {
    name: "string",
    url: "string",
    email: "string"
  }
);
export type ContactObject = {
  name?: string;
  url?: string;
  email?: string;
};
export const ContactObject = _type<ContactObject>(
  "ContactObject",
  isContactObject
);
