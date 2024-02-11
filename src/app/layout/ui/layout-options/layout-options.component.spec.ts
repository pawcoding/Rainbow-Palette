import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutOptionsComponent } from './layout-options.component';

describe('LayoutOptionsComponent', () => {
  let component: LayoutOptionsComponent;
  let fixture: ComponentFixture<LayoutOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
