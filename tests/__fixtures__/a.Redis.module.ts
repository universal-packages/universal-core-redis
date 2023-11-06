import { EnvironmentName } from '@universal-packages/core'

import { RedisModule } from '../../src'

export default class TestRedisModule extends RedisModule {
  public static readonly environment: EnvironmentName = 'test'
}
