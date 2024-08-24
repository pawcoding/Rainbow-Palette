import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorRangeSliderComponent } from './color-range-slider.component';

describe('ColorRangeSliderComponent', () => {
  let component: ColorRangeSliderComponent;
  let fixture: ComponentFixture<ColorRangeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorRangeSliderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ColorRangeSliderComponent);
    component = fixture.componentInstance;

    // @ts-expect-error - Bind required input signal
    component.label = signal('Label');
    // @ts-expect-error - Bind required input signal
    component.tooltip = signal('Tooltip');
    // @ts-expect-error - Bind required input signal
    component.key = signal('hue');
    // @ts-expect-error - Bind required input signal
    component.value = signal(0);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
