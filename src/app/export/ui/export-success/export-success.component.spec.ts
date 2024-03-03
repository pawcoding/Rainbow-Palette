import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ExportFormat } from '../../constants/export-format';
import { ExportOption } from '../../types/export-option';
import { ExportSuccessComponent } from './export-success.component';

describe('ExportSuccessComponent', () => {
  let component: ExportSuccessComponent;
  let fixture: ComponentFixture<ExportSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportSuccessComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportSuccessComponent);
    component = fixture.componentInstance;

    // @ts-expect-error
    component.exportFormat = signal(ExportFormat.TAILWIND);
    // @ts-expect-error
    component.exportOption = signal<ExportOption>('copy');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
