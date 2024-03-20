import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ColorInputComponent } from './color-input.component';

describe('ColorInputComponent', () => {
  let component: ColorInputComponent;
  let fixture: ComponentFixture<ColorInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorInputComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ColorInputComponent);
    component = fixture.componentInstance;

    //@ts-expect-error - Bind required input signal
    component.placeholder = signal('Placeholder');
    //@ts-expect-error - Bind required input signal
    component.tooltip = signal('Tooltip');
    //@ts-expect-error - Bind required input signal
    component.hex = signal('#000000');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
