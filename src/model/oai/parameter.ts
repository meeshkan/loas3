import { SchemaObject } from "./schema";
import { _is, _type, _choose, L } from "./util";

export type KnownHeaderObject = {
  description: string;
  deprecated?: boolean;
  schema: SchemaObject;
  examples?: any[];
  example?: any;
  style?: "simple";
  required?: boolean;
  explode?: boolean;
};

const isKnownHeaderObject = _is<KnownHeaderObject>(
  {
    description: "string",
    schema: _choose([SchemaObject])
  },
  {
    deprecated: "boolean",
    examples: (v: any) => v instanceof Array,
    example: (_: any) => true,
    explode: "boolean",
    required: "boolean",
    style: new L("simple")
  }
);

export const KnownHeaderObject = _type<KnownHeaderObject>(
  "KnownHeaderObject",
  isKnownHeaderObject
);

export type HeaderObject = {
  name: string;
  in: "header";
  style?: "simple";
  description: string;
  deprecated?: boolean;
  schema: SchemaObject;
  examples?: any[];
  example?: any;
  explode?: boolean;
  required?: boolean;
};

const isHeaderObject = _is<HeaderObject>(
  {
    name: "string",
    in: new L("header"),
    description: "string",
    schema: _choose([SchemaObject])
  },
  {
    deprecated: "boolean",
    examples: (v: any) => v instanceof Array,
    example: (_: any) => true,
    explode: "boolean",
    required: "boolean",
    style: new L("simple")
  }
);

export const HeaderObject = _type<HeaderObject>("HeaderObject", isHeaderObject);

////////////

export type KnownPathObject = {
  description: string;
  required: true;
  deprecated?: boolean;
  schema: SchemaObject;
  examples?: any[];
  example?: any;
  explode?: boolean;
  style?: "simple" | "matrix" | "label";
};

const isKnownPathObject = _is<KnownPathObject>(
  {
    description: "string",
    schema: _choose([SchemaObject]),
    required: new L(true)
  },
  {
    deprecated: "boolean",
    examples: (v: any) => v instanceof Array,
    example: (_: any) => true,
    explode: "boolean",
    style: v => ["simple", "matrix", "label"].indexOf(v as string) !== -1
  }
);

const KnownPathObject = _type<KnownPathObject>(
  "KnownPathObject",
  isKnownPathObject
);

export type PathObject = {
  name: string;
  in: "path";
  style?: "simple" | "matrix" | "label";
  required: true;
  description: string;
  deprecated?: boolean;
  schema: SchemaObject;
  examples?: any[];
  example?: any;
  explode?: boolean;
};

const isPathObject = _is<PathObject>(
  {
    name: "string",
    in: new L("path"),
    description: "string",
    schema: _choose([SchemaObject]),
    required: new L(true)
  },
  {
    deprecated: "boolean",
    examples: (v: any) => v instanceof Array,
    example: (_: any) => true,
    explode: "boolean",
    style: v => ["simple", "matrix", "label"].indexOf(v as string) !== -1
  }
);

const PathObject = _type<PathObject>("PathObject", isPathObject);
///////

export type KnownQueryObject = {
  description: string;
  required?: boolean;
  deprecated?: boolean;
  schema: SchemaObject;
  examples?: any[];
  example?: any;
  explode?: boolean;
  allowEmptyValue?: true;
  allowReserved?: true;
  style?: "form" | "spaceDelimited" | "pipeDelimited" | "deepObject";
};

const isKnownQueryObject = _is<KnownQueryObject>(
  {
    description: "string",
    schema: _choose([SchemaObject])
  },
  {
    deprecated: "boolean",
    required: "boolean",
    examples: (v: any) => v instanceof Array,
    example: (_: any) => true,
    explode: "boolean",
    allowEmptyValue: "boolean",
    allowReserved: "boolean",
    style: v =>
      ["form", "spaceDelimited", "pipeDelimited", "deepObject"].indexOf(
        v as string
      ) !== -1
  }
);

const KnownQueryObject = _type<KnownQueryObject>(
  "KnownQueryObject",
  isKnownQueryObject
);

export type QueryObject = {
  name: string;
  in: "query";
  description: string;
  required?: boolean;
  deprecated?: boolean;
  schema: SchemaObject;
  examples?: any[];
  example?: any;
  explode?: boolean;
  allowEmptyValue?: true;
  allowReserved?: true;
  style?: "form" | "spaceDelimited" | "pipeDelimited" | "deepObject";
};

const isQueryObject = _is<QueryObject>(
  {
    name: "string",
    in: new L("query"),
    description: "string",
    schema: _choose([SchemaObject])
  },
  {
    deprecated: "boolean",
    required: "boolean",
    examples: (v: any) => v instanceof Array,
    example: (_: any) => true,
    explode: "boolean",
    allowEmptyValue: "boolean",
    allowReserved: "boolean",
    style: v =>
      ["form", "spaceDelimited", "pipeDelimited", "deepObject"].indexOf(
        v as string
      ) !== -1
  }
);

const QueryObject = _type<QueryObject>("QueryObject", isQueryObject);

//////

export type KnownCookieObject = {
  description: string;
  deprecated?: boolean;
  schema: SchemaObject;
  examples?: any[];
  example?: any;
  style?: "form";
  required?: boolean;
  explode?: boolean;
};

const isKnownCookieObject = _is<KnownCookieObject>(
  {
    description: "string",
    schema: _choose([SchemaObject])
  },
  {
    deprecated: "boolean",
    examples: (v: any) => v instanceof Array,
    example: (_: any) => true,
    explode: "boolean",
    required: "boolean",
    style: new L("form")
  }
);

const KnownCookieObject = _type<KnownCookieObject>(
  "KnownCookieObject",
  isKnownCookieObject
);

export type CookieObject = {
  name: string;
  in: "cookie";
  style?: "form";
  description: string;
  deprecated?: boolean;
  schema: SchemaObject;
  examples?: any[];
  example?: any;
  explode?: boolean;
  required?: boolean;
};

const isCookieObject = _is<CookieObject>(
  {
    name: "string",
    in: new L("cookie"),
    description: "string",
    schema: _choose([SchemaObject])
  },
  {
    deprecated: "boolean",
    examples: (v: any) => v instanceof Array,
    example: (_: any) => true,
    explode: "boolean",
    required: "boolean",
    style: new L("form")
  }
);

const CookieObject = _type<CookieObject>("CookieObject", isCookieObject);
//////

export type ParameterObject =
  | CookieObject
  | HeaderObject
  | PathObject
  | QueryObject;
const isParameter = (u: unknown): u is ParameterObject =>
  _choose([CookieObject, HeaderObject, PathObject, QueryObject])(u);
export const ParameterObject = _type<ParameterObject>(
  "ParameterObject",
  isParameter
);
