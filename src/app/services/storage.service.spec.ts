import { TestBed } from '@angular/core/testing'

import { StorageService } from './storage.service'
import { TranslateModule } from '@ngx-translate/core'

describe('StorageService', () => {
  let service: StorageService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
    })
    service = TestBed.inject(StorageService)
  })

  it('Create service with initial state', () => {
    expect(service).toBeTruthy()
    expect(service.dark()).toBeDefined()
  })

  it('Toggle theme', () => {
    const initialTheme = service.dark()
    const toggledTheme = service.toggleTheme(undefined)
    expect(toggledTheme).toBe(!initialTheme)
    expect(service.dark()).toBe(!initialTheme)

    const forcedDark = service.toggleTheme(true)
    expect(forcedDark).toBe(true)
    expect(service.dark()).toBe(true)

    const forcedLight = service.toggleTheme(false)
    expect(forcedLight).toBe(false)
    expect(service.dark()).toBe(false)
  })
})
