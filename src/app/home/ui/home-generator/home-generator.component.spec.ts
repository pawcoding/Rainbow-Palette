import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGeneratorComponent } from './home-generator.component';

describe('HomeGeneratorComponent', () => {
  let component: HomeGeneratorComponent;
  let fixture: ComponentFixture<HomeGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeGeneratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
