import { TestBed } from '@angular/core/testing'

import { PaletteService } from './palette.service'
import { TranslateModule } from '@ngx-translate/core'
import { StorageService } from './storage.service'
import { StorageServiceMock } from '../mocks/storage.service.mock'

describe('PaletteService', () => {
  let service: PaletteService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [{ provide: StorageService, useClass: StorageServiceMock }],
    })
    service = TestBed.inject(PaletteService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
