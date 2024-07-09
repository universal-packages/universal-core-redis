import { CoreModule, EnvironmentName } from '@universal-packages/core'
import { createClient } from 'redis'

import { LOG_CONFIGURATION } from './LOG_CONFIGURATION'
import { RedisClient, RedisModuleConfig } from './redis.types'

export default class RedisModule extends CoreModule<RedisModuleConfig> {
  public static readonly environment: EnvironmentName = '!test'
  public static readonly moduleName = 'redis'
  public static readonly description = 'Redis core module wrapper'

  public subject: RedisClient

  public async prepare(): Promise<void> {
    this.subject = createClient(this.config)

    this.subject.on('connect', (): void => {
      this.logger.log(
        {
          level: 'DEBUG',
          title: 'Redis client is connecting',
          category: 'REDIS',
          metadata: this.config
        },
        LOG_CONFIGURATION
      )
    })

    this.subject.on('ready', (): void => {
      this.logger.log(
        {
          level: 'INFO',
          title: 'Redis client is ready',
          category: 'REDIS'
        },
        LOG_CONFIGURATION
      )
    })

    this.subject.on('error', (error: Error): void => {
      this.logger.log(
        {
          level: 'ERROR',
          title: 'There was an error while connected to the server',
          category: 'REDIS',
          error
        },
        LOG_CONFIGURATION
      )
    })

    this.subject.on('reconnecting', (): void => {
      this.logger.log(
        {
          level: 'WARNING',
          message: 'Reconnecting to server',
          category: 'REDIS'
        },
        LOG_CONFIGURATION
      )
    })

    await this.subject.connect()
  }

  public async release(): Promise<void> {
    await this.subject.disconnect()
  }
}
