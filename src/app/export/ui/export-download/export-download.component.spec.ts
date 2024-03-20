import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ExportFormat } from '../../../shared/constants/export-format';
import { ExportDownloadComponent } from './export-download.component';

describe('ExportDownloadComponent', () => {
  let component: ExportDownloadComponent;
  let fixture: ComponentFixture<ExportDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportDownloadComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExportDownloadComponent);
    component = fixture.componentInstance;

    // @ts-expect-error - Bind required signal input
    component.exportFormat = signal(ExportFormat.TAILWIND);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
