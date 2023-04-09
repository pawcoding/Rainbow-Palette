import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PreviewComponent } from './preview.component'
import { TranslateModule } from '@ngx-translate/core'

describe('PreviewComponent', () => {
  let component: PreviewComponent
  let fixture: ComponentFixture<PreviewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()

    fixture = TestBed.createComponent(PreviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
