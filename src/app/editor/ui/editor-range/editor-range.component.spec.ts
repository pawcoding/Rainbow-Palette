import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorRangeComponent } from './editor-range.component';

describe('EditorRangeComponent', () => {
  let component: EditorRangeComponent;
  let fixture: ComponentFixture<EditorRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorRangeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditorRangeComponent);
    component = fixture.componentInstance;

    // @ts-expect-error
    component.label = signal('Label');
    // @ts-expect-error
    component.tooltip = signal('Tooltip')
    // @ts-expect-error
    component.key = signal('hue');
    // @ts-expect-error
    component.value = signal(0);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
