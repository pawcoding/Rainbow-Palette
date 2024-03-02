import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ExportFormatComponent } from './export-format.component';

describe('ExportFormatComponent', () => {
  let component: ExportFormatComponent;
  let fixture: ComponentFixture<ExportFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportFormatComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
