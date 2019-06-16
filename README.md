# loai3

OpenAPI 3 for lazy people.

## tl;dr

This:
```yaml
paths:
  /foo: 1
```

becomes:

```yaml
openapi: 3.0.0
info:
  name: lazy
  version: 0.0.0
paths:
  /foo:
    get:
      responses:
        default:
          description: too lazy
          content:
            application-json:
              schema:
                type: integer
                format: int64
                default: 1
```

## Why

Because sometimes you need to write an OpenAPI spec.

## How does it work.

[Lazy types](src/model/LazyOpenApi.ts) in. [Unlazy types](src/model/OpenApi.ts) out.  Feel free to mix and match.

## Examples

See the tests.

## Thanks

Thanks to (metadevpro)[https://github.com/metadevpro] for providing the unlazy types.