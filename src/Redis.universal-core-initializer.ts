import { CoreInitializer } from '@universal-packages/core'

export default class RedisInitializer extends CoreInitializer {
  public static readonly initializerName = 'redis'
  public static readonly description: string = 'Core Redis initializer'

  public readonly templatesLocation: string = `${__dirname}/templates`
}
