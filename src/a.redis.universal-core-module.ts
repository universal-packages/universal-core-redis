import { RedisClientType, RedisFunctions, RedisModules, RedisScripts } from '@redis/client'
import { CoreModule } from '@universal-packages/core'
import { TerminalTransport } from '@universal-packages/logger'
import { createClient } from 'redis'
import { RedisModuleConfig } from './redis.types'

export default class IoredisModule extends CoreModule<RedisModuleConfig> {
  public static readonly moduleName = 'redis-module'
  public static readonly description = 'Redis core module wrapper'

  public client: RedisClientType<RedisModules, RedisFunctions, RedisScripts>

  public async prepare(): Promise<void> {
    const terminalTransport = this.logger.getTransport('terminal') as TerminalTransport
    terminalTransport.options.categoryColors['REDIS'] = 'RED'

    this.client = createClient(this.config)

    this.client.on('connect', (): void => {
      this.logger.publish('DEBUG', 'Redis client is connecting', null, 'REDIS', { metadata: this.config })
    })

    this.client.on('ready', (): void => {
      this.logger.publish('INFO', 'Redis client is rady', null, 'REDIS')
    })

    await this.client.connect()

    this.client.on('error', (error: Error): void => {
      this.logger.publish('ERROR', 'There was an error while connected to the server', null, 'REDIS', { error })
    })

    this.client.on('reconnecting', (): void => {
      this.logger.publish('WARNING', 'Reconnecting to server', null, 'REDIS')
    })
  }

  public async release(): Promise<void> {
    await this.client.disconnect()
  }
}
