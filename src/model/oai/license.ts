import t from "io-ts";
import { _is, _type } from "./util";

export const isLicenseObject = _is<LicenseObject>(
  {
    name: "string"
  },
  {
    url: "string"
  }
);
export type LicenseObject = {
  name: string;
  url?: string;
};
export const LicenseObject = _type<LicenseObject>(
  "LicenseObject",
  isLicenseObject
);
