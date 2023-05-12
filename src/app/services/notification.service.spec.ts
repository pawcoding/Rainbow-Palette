import { TestBed } from '@angular/core/testing'

import { NotificationService } from './notification.service'
import { sleep } from '../utils/sleep.util'

describe('NotificationService', () => {
  let service: NotificationService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(NotificationService)
  })

  it('Create Service with initial state', () => {
    expect(service).toBeTruthy()
    expect(service.notification()).toBeUndefined()
  })

  it('Open / close notification', async () => {
    service.openNotification('test')
    expect(service.notification()).toBe('test')

    service.closeNotification()
    expect(service.notification()).toBeUndefined()

    service.openNotification('test', 1000)
    await sleep(1500, 'SPEC_NOTIFICATION')
    expect(service.notification()).toBeUndefined()
  })
})
