import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LanguageSelectorComponent } from './language-selector.component'
import { TranslateModule } from '@ngx-translate/core'
import { MatomoMockModule } from '../../utils/matomo.mock.module'

describe('LanguageSelectorComponent', () => {
  let component: LanguageSelectorComponent
  let fixture: ComponentFixture<LanguageSelectorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguageSelectorComponent],
      imports: [TranslateModule.forRoot(), MatomoMockModule],
    }).compileComponents()

    fixture = TestBed.createComponent(LanguageSelectorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
