import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DialogComponent } from './dialog.component'
import { MatomoMockModule } from '../../utils/matomo.mock.module'

describe('DialogComponent', () => {
  let component: DialogComponent
  let fixture: ComponentFixture<DialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogComponent],
      imports: [MatomoMockModule],
    }).compileComponents()

    fixture = TestBed.createComponent(DialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
