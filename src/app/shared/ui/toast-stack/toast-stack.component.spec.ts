import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastStackComponent } from './toast-stack.component';

describe('ToastStackComponent', () => {
  let component: ToastStackComponent;
  let fixture: ComponentFixture<ToastStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastStackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToastStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
