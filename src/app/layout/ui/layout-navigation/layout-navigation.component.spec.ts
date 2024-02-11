import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutNavigationComponent } from './layout-navigation.component';

describe('LayoutNavigationComponent', () => {
  let component: LayoutNavigationComponent;
  let fixture: ComponentFixture<LayoutNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
