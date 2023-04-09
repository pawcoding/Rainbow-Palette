import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditComponent } from './edit.component'
import { TranslateModule } from '@ngx-translate/core'

describe('EditComponent', () => {
  let component: EditComponent
  let fixture: ComponentFixture<EditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(EditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
