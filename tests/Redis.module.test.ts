import { Logger } from '@universal-packages/logger'
import EventEmitter from 'events'
import { createClient } from 'redis'

import { RedisModule } from '../src'

class ClientMock extends EventEmitter {
  public connect() {
    this.emit('connect')
    this.emit('ready')
  }

  public disconnect() {
    this.emit('error', new Error())
    this.emit('reconnecting')
  }
}

jest.mock('redis')
const createClientMock = createClient as unknown as jest.Mock
createClientMock.mockImplementation((): ClientMock => new ClientMock())

describe(RedisModule, (): void => {
  it('behaves as expected', async (): Promise<void> => {
    const logger = new Logger({ silence: true })
    const module = new RedisModule({} as any, logger)

    await module.prepare()

    expect(createClient).toHaveBeenCalled()

    await module.release()

    expect(createClient).toHaveBeenCalled()
  })
})
