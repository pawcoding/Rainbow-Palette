import { TestBed } from '@angular/core/testing'

import { ColorService } from './color.service'
import { TranslateModule } from '@ngx-translate/core'
import { StorageService } from './storage.service'
import { StorageServiceMock } from '../mocks/storage.service.mock'

describe('ColorService', () => {
  let service: ColorService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [{ provide: StorageService, useClass: StorageServiceMock }],
    })
    service = TestBed.inject(ColorService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
