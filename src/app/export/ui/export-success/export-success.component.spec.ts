import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportSuccessComponent } from './export-success.component';

describe('ExportSuccessComponent', () => {
  let component: ExportSuccessComponent;
  let fixture: ComponentFixture<ExportSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExportSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
