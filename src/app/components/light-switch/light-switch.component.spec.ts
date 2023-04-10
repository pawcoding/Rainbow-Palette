import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LightSwitchComponent } from './light-switch.component'
import { TranslateModule } from '@ngx-translate/core'
import { MatomoMockModule } from '../../utils/matomo.mock.module'

describe('LightSwitchComponent', () => {
  let component: LightSwitchComponent
  let fixture: ComponentFixture<LightSwitchComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LightSwitchComponent],
      imports: [TranslateModule.forRoot(), MatomoMockModule],
    }).compileComponents()

    fixture = TestBed.createComponent(LightSwitchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
