import { ContactObject } from "./contact";
import { LicenseObject } from "./license";
import { _is, _type, _choose } from "./util";

export const isInfoObject = _is<InfoObject>(
  {
    title: "string",
    version: "string"
  },
  {
    description: "string",
    termsOfService: "string",
    contact: _choose([ContactObject]),
    license: _choose([LicenseObject])
  }
);
export type InfoObject = {
  title: string;
  version: string;
  description?: string;
  termsOfService?: string;
  contact?: ContactObject;
  license?: LicenseObject;
};
export const InfoObject = _type<InfoObject>("InfoObject", isInfoObject);
