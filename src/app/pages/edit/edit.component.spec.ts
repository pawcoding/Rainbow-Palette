import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditComponent } from './edit.component'
import { TranslateModule } from '@ngx-translate/core'
import { StorageService } from 'src/app/services/storage.service'
import { StorageServiceMock } from 'src/app/mocks/storage.service.mock'

describe('EditComponent', () => {
  let component: EditComponent
  let fixture: ComponentFixture<EditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [TranslateModule.forRoot()],
      providers: [{ provide: StorageService, useClass: StorageServiceMock }],
    }).compileComponents()

    fixture = TestBed.createComponent(EditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
