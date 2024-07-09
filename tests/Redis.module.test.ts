import { RedisModule } from '../src'

coreJest.runBare({
  coreConfigOverride: {
    config: { location: './tests/__fixtures__/config' },
    modules: { location: './tests/__fixtures__' },
    logger: { silence: false }
  }
})

describe(RedisModule, (): void => {
  it('behaves as expected', async (): Promise<void> => {
    expect(global.redisSubject).not.toBeUndefined()
    expect(global.redisSubject.options).toMatchObject({ host: 'localhost' })
  })
})
