import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LanguageSelectorComponent } from './language-selector.component'
import { TranslateModule } from '@ngx-translate/core'
import { matomoProvidersMock } from '../../mocks/matomo.providers.mock'

describe('LanguageSelectorComponent', () => {
  let component: LanguageSelectorComponent
  let fixture: ComponentFixture<LanguageSelectorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguageSelectorComponent],
      imports: [TranslateModule.forRoot()],
      providers: [...matomoProvidersMock],
    }).compileComponents()

    fixture = TestBed.createComponent(LanguageSelectorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
