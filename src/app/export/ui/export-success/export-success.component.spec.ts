import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ExportFormat } from '../../../shared/constants/export-format';
import { ExportOption } from '../../../shared/types/export-option';
import { ExportSuccessComponent } from './export-success.component';

describe('ExportSuccessComponent', () => {
  let component: ExportSuccessComponent;
  let fixture: ComponentFixture<ExportSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportSuccessComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExportSuccessComponent);
    component = fixture.componentInstance;

    // @ts-expect-error - Bind required signal input
    component.exportFormat = signal(ExportFormat.TAILWIND);
    // @ts-expect-error - Bind required signal input
    component.exportOption = signal<ExportOption>('copy');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
