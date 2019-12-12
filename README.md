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

## How does it work?

Lazy JSON schema is defined in [src/schema/lazy.ts](src/schema/lazy.ts). These, along with the "un"-lazy types from the JSON schema for the [official OpenAPI 3.0 Specification](src/schema/full.ts) are translated into TypeScript types and validators. The lazy OAS3 is expanded into full OAS 3 based on various sensible conventions.

## Examples

See the [tests](test/).

## Command-line usage

### [yarn](https://yarnpkg.com/en/)

```bash
// Install loas3
yarn add loas3

// Convert a lazy specification into OpenAPI
yarn loas3 /path/to/lazy-spec.yaml
```

### [npx](https://www.npmjs.com/package/npx)

```bash
// Install loas3
npm i loas3

// Convert a lazy specification into OpenAPI
npx loas3 /path/to/lazy-spec.yaml
```

## Development

Before starting, make sure that you have [Git Large File Storage (LFS)](https://git-lfs.github.com/) installed. We use this to store the API schemas and it's required for the tests to pass locally.

Install dependencies and run tests:

```bash
yarn
```

Run the CLI

```bash
yarn cli /path/to/lazy-spec.yml
```

## ACHTUNG!

There is one important difference between our flavor of OpenAPI and the real OpenAPI spec. Here, `items` can be **either** a Schema **or** an array of schemas.

## Contributing

Thanks for wanting to contribute! We will soon have a contributing page
detaling how to contribute. Meanwhile, there are plenty of features that haven't been implemented yet. Please check out our [open issues](https://github.com/unmock/loas3/issues). We'd really appreciate your help!


Please note that this project is governed by the [Unmock Community Code of Conduct](https://github.com/unmock/code-of-conduct). By participating in this project, you agree to abide by its terms.
