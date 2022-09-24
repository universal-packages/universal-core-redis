# Core Redis

[![npm version](https://badge.fury.io/js/@universal-packages%2Fcore-redis.svg)](https://www.npmjs.com/package/@universal-packages/core-redis)
[![Testing](https://github.com/universal-packages/universal-core-redis/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-core-redis/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-core-redis/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-core-redis)

[Redis](https://github.com/redis/node-redis) universal-core module abstraction.

## Install

```shell
npm install @universal-packages/core-redis
npm install redis
```

## Initialization

```shell
ucore exec redis-task init
```

## Global

Core expose `RedisClient` as the global subject if core `modulesAsGlobals` config is true.

```js
redisSubject.set()
```

```js
core.coreModules.redisModule.subject.set()
```

### Typescript

In order for typescript to see the `redisSubject` global you need to reference the types somewhere in your project, normally `./src/globals.ts`.

```ts
/// <reference types="@universal-packages/core-redis" />
```

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
