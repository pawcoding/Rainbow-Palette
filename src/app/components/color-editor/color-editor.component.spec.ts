import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ColorEditorComponent } from './color-editor.component'
import { TranslateModule } from '@ngx-translate/core'
import { StorageServiceMock } from 'src/app/mocks/storage.service.mock'
import { StorageService } from 'src/app/services/storage.service'

describe('ColorEditorComponent', () => {
  let component: ColorEditorComponent
  let fixture: ComponentFixture<ColorEditorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorEditorComponent],
      imports: [TranslateModule.forRoot()],
      providers: [{ provide: StorageService, useClass: StorageServiceMock }],
    }).compileComponents()

    fixture = TestBed.createComponent(ColorEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
