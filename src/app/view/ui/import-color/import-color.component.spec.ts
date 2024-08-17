import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ListService, ListServiceMock } from '../../../shared/data-access/list.service';
import { PaletteService, PaletteServiceMock } from '../../../shared/data-access/palette.service';
import { ImportColorComponent } from './import-color.component';

describe('ImportColorComponent', () => {
  let component: ImportColorComponent;
  let fixture: ComponentFixture<ImportColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportColorComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: DIALOG_DATA,
          useValue: { paletteId: 'test' }
        },
        {
          provide: DialogRef,
          useValue: {}
        },
        {
          provide: ListService,
          useClass: ListServiceMock
        },
        {
          provide: PaletteService,
          useClass: PaletteServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ImportColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
