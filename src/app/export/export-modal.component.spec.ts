import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import {
  ToastService,
  ToastServiceMock,
} from '../shared/data-access/toast.service';
import { Color } from '../shared/model/color.model';
import { Palette } from '../shared/model/palette.model';
import { Shade } from '../shared/model/shade.model';
import { ExportModalComponent } from './export-modal.component';

describe('ExportModalComponent', () => {
  let component: ExportModalComponent;
  let fixture: ComponentFixture<ExportModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportModalComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: DIALOG_DATA,
          useValue: {
            palette: new Palette('TestPalette', [
              new Color([Shade.random()], 'TestColor'),
            ]),
          },
        },
        {
          provide: DialogRef,
          useValue: {},
        },
        {
          provide: ToastService,
          useClass: ToastServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
