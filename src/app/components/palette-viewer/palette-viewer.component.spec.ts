import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PaletteViewerComponent } from './palette-viewer.component'
import { TranslateModule } from '@ngx-translate/core'
import { matomoProvidersMock } from '../../mocks/matomo.providers.mock'

describe('PaletteViewerComponent', () => {
  let component: PaletteViewerComponent
  let fixture: ComponentFixture<PaletteViewerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaletteViewerComponent],
      imports: [TranslateModule.forRoot()],
      providers: [...matomoProvidersMock],
    }).compileComponents()

    fixture = TestBed.createComponent(PaletteViewerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
