import {
  $Responses,
  $$Responses,
  is$$Responses,
  is$Reference
} from "../generated/lazy";
import { Responses } from "../generated/full";
import _response from "./response";

export default (o: $Responses): Responses =>
  is$$Responses(o)
    ? Object.entries(o)
        .map(([a, b]) => ({
          [a]:
            is$Reference(b) && b.$ref.substring(0, 11) === "#/responses"
              ? b
              : _response(b)
        }))
        .reduce((a, b) => ({ ...a, ...b }), {})
    : {
        default: _response(o)
      };
