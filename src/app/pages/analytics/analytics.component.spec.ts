import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AnalyticsComponent } from './analytics.component'
import { TranslateModule } from '@ngx-translate/core'
import { matomoProvidersMock } from '../../mocks/matomo.providers.mock'
import { StorageService } from 'src/app/services/storage.service'
import { StorageServiceMock } from 'src/app/mocks/storage.service.mock'

describe('AnalyticsComponent', () => {
  let component: AnalyticsComponent
  let fixture: ComponentFixture<AnalyticsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalyticsComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        ...matomoProvidersMock,
        { provide: StorageService, useClass: StorageServiceMock },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(AnalyticsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
