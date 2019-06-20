import openApi from "./lazy/openApi";
import { $OpenAPIObject } from "./model/LazyOpenApi";
import { OpenAPIObject } from "openapi3-ts";

export default (o: $OpenAPIObject): OpenAPIObject => openApi(o);
