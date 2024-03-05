import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import {
  ExportService,
  ExportServiceMock,
  ToastService,
  ToastServiceMock,
} from '../shared/data-access';
import { Color, Palette, Shade } from '../shared/model';
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
        {
          provide: ExportService,
          useClass: ExportServiceMock,
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
