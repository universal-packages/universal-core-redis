import { CoreModule } from '@universal-packages/core'
import { TerminalTransport } from '@universal-packages/logger'
import { createClient } from 'redis'

import { RedisClient, RedisModuleConfig } from './redis.types'

export default class RedisModule extends CoreModule<RedisModuleConfig> {
  public static readonly environment = '!test'
  public static readonly moduleName = 'redis-module'
  public static readonly description = 'Redis core module wrapper'

  public subject: RedisClient

  public async prepare(): Promise<void> {
    const terminalTransport = this.logger.getTransport('terminal') as TerminalTransport
    terminalTransport.options.categoryColors['REDIS'] = 'RED'

    this.subject = createClient(this.config)

    this.subject.on('connect', (): void => {
      this.logger.publish('DEBUG', 'Redis client is connecting', null, 'REDIS', { metadata: this.config })
    })

    this.subject.on('ready', (): void => {
      this.logger.publish('INFO', 'Redis client is ready', null, 'REDIS')
    })

    await this.subject.connect()

    this.subject.on('error', (error: Error): void => {
      this.logger.publish('ERROR', 'There was an error while connected to the server', null, 'REDIS', { error })
    })

    this.subject.on('reconnecting', (): void => {
      this.logger.publish('WARNING', 'Reconnecting to server', null, 'REDIS')
    })
  }

  public async release(): Promise<void> {
    await this.subject.disconnect()
  }
}
