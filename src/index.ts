import openApi from "./lazy/openApi";
import { $OpenAPIObject } from "./model/LazyOpenApi";
import { OpenAPIObject } from "./model/OpenApi";

export default (o: $OpenAPIObject): OpenAPIObject => openApi(o);