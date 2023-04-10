import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { TranslateModule } from '@ngx-translate/core'
import { LightSwitchComponent } from './components/light-switch/light-switch.component'
import { NotificationComponent } from './components/notification/notification.component'
import { DialogComponent } from './components/dialog/dialog.component'
import { RouterModule } from '@angular/router'
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component'
import { MatomoMockModule } from './utils/matomo.mock.module'
import { ServiceWorkerModule } from '@angular/service-worker'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LightSwitchComponent,
        LanguageSelectorComponent,
        NotificationComponent,
        DialogComponent,
      ],
      imports: [
        TranslateModule.forRoot(),
        RouterModule.forRoot([]),
        ServiceWorkerModule.register('', { enabled: false }),
        MatomoMockModule,
      ],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'Rainbow Palette'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.title).toMatch(/Rainbow Palette \| /)
  })
})
