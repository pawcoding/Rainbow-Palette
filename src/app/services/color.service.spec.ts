import { TestBed } from '@angular/core/testing'

import { ColorService } from './color.service'
import { TranslateModule } from '@ngx-translate/core'

describe('ColorService', () => {
  let service: ColorService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
    })
    service = TestBed.inject(ColorService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
