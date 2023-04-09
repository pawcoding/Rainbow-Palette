import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ColorEditorComponent } from './color-editor.component'
import { TranslateModule } from '@ngx-translate/core'

describe('ColorEditorComponent', () => {
  let component: ColorEditorComponent
  let fixture: ComponentFixture<ColorEditorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorEditorComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(ColorEditorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
