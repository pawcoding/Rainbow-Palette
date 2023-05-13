import { TestBed } from '@angular/core/testing'

import { DialogService } from './dialog.service'

describe('DialogService', () => {
  let service: DialogService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(DialogService)
  })

  it('Create service with initial state', () => {
    expect(service).toBeTruthy()
    expect(service.dialog()).toBeUndefined()
  })

  it('Open / close dialog', () => {
    service.openDialog({ id: 'test' })
    expect(service.dialog()?.id).toBe('test')

    service.closeDialog()
    expect(service.dialog()).toBeUndefined()

    service.openDialog({
      id: 'test',
      actions: [{ id: 'close', callback: async () => undefined }],
    })
    expect(service.dialog()?.id).toBe('test')
    expect(service.dialog()?.actions?.length).toBe(1)
    expect(service.dialog()?.actions?.[0].id).toBe('close')
    expect(service.dialog()?.actions?.[0].callback).toBeTruthy()
  })
})
