import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFormatComponent } from './request-format.component';

describe('RequestFormatComponent', () => {
  let component: RequestFormatComponent;
  let fixture: ComponentFixture<RequestFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestFormatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
