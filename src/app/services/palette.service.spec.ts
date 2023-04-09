import { TestBed } from '@angular/core/testing'

import { PaletteService } from './palette.service'
import { TranslateModule } from '@ngx-translate/core'

describe('PaletteService', () => {
  let service: PaletteService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
    })
    service = TestBed.inject(PaletteService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
