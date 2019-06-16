import { ISpecificationExtension } from "./SpecificationExtension";
import {
    ParameterObject,
    PathItemObject,
    OperationObject,
    ResponseObject,
    BaseParameterObject,
    ContentObject,
    MediaTypeObject,
    RequestBodyObject,
    SchemaObject,
    ReferenceObject,
    OpenAPIObject,
    InfoObject,
    ResponsesObject,
} from "./OpenApi";

export type LazyParameter = ReferenceObject | { [key: string]: SchemaObject } | JSONValue;

export interface LazyParameters {
    query: LazyParameter;
    header: LazyParameter;
    path: LazyParameter;
    cookie: LazyParameter;
}

export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = { [member: string]: JSONValue };
export interface JSONArray extends Array<JSONValue> {}

export type $RequestBodyObject = RequestBodyObject | $ContentObject;
export type $BaseParameterObject = BaseParameterObject | SchemaObject | JSONValue;
export type $ParameterObject = ParameterObject | SchemaObject | JSONValue;
export type $ParametersObject = (ParameterObject | ReferenceObject)[] | ParameterObject | LazyParameters | JSONObject;
export type $SchemaObject = SchemaObject | JSONValue;
export type $MediaTypeObject = MediaTypeObject | $SchemaObject;
export type $ContentObject = ContentObject | $MediaTypeObject;
export type $ResponseObject = ResponseObject | $ContentObject;
export interface $$ResponsesObject extends ISpecificationExtension {
    default?: $ResponseObject | ReferenceObject;
    [statuscode: string]: $ResponseObject | ReferenceObject | any;   // (any) = Hack for allowing ISpecificationExtension
}
export interface $HeadersObject {
    [k: string]: $BaseParameterObject,
}

export type $ResponsesObject = $$ResponsesObject | $ResponseObject;
export type $OperationObject = OperationObject | $ResponsesObject;
export type $PathItemObject = PathItemObject | $OperationObject;

export interface $PathsObject extends ISpecificationExtension {
    [path: string]: $PathItemObject | any;
}
export type $InfoObject = Partial<InfoObject>;
export type $OpenAPIObject = Partial<OpenAPIObject>;
