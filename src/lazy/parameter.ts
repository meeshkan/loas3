import { $LazyLazyParams, $LazyParams } from "../generated/lazy";
import { Parameter } from "../generated/full";
import _schema from "./schema";

export const _lazylazy = (o: $LazyLazyParams, path: string): Parameter[] =>
  Object.entries(o).map(([a, b]) => ({
    name: a,
    // if the name is foo, heck if {foo} the path, if not theere, default to query
    in: path.indexOf(`{${a}}`) !== -1 ? "path" : "query",
    schema: _schema(b),
  }));

export const _lazy = ({
  query,
  header,
  cookie,
  path,
}: $LazyParams): Parameter[] => [
  ...(query
    ? Object.entries(query).map(([name, v]) => ({
        in: "query",
        name,
        schema: _schema(v),
      }))
    : []),
  ...(header
    ? Object.entries(header).map(([name, v]) => ({
        in: "header",
        name,
        schema: _schema(v),
      }))
    : []),
  ...(path
    ? Object.entries(path).map(([name, v]) => ({
        in: "path",
        name,
        schema: _schema(v),
      }))
    : []),
  ...(cookie
    ? Object.entries(cookie).map(([name, v]) => ({
        in: "cookie",
        name,
        schema: _schema(v),
      }))
    : []),
];
