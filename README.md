[![CircleCI](https://circleci.com/gh/unmock/loas3.svg?style=svg)](https://circleci.com/gh/unmock/loas3)

# loas3

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

## TODO

- Better (lazy) types.
- More examples.

## How does it work?

Lazy types are identified in [schema/lazy.yml](schema/lazy.yml). These, along with the "un"-lazy types from the [official OpenAPI 3.0 Specification](schema/full.yml) are translated into TypeScript types and validators. The lazy OAS3 is expanded into full OAS 3 based on various sensible conventions.

## Examples

See the [tests](test/lazy/).
