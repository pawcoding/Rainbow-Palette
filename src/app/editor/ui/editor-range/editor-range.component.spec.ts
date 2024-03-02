import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorRangeComponent } from './editor-range.component';

describe('EditorRangeComponent', () => {
  let component: EditorRangeComponent;
  let fixture: ComponentFixture<EditorRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorRangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditorRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
