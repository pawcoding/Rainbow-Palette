import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportDownloadComponent } from './export-download.component';

describe('ExportDownloadComponent', () => {
  let component: ExportDownloadComponent;
  let fixture: ComponentFixture<ExportDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportDownloadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExportDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
