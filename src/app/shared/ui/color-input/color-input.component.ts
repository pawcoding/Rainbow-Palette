import { Component, ElementRef, computed, effect, input, model, output, viewChild } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { heroEyeDropperMini } from '@ng-icons/heroicons/mini';
import { TranslateModule } from '@ngx-translate/core';
import { perceivedBrightnessFromHex } from '../../utils/perceived-brightness';

@Component({
  selector: 'rp-color-input',
  standalone: true,
  imports: [TranslateModule, NgIconComponent],
  templateUrl: './color-input.component.html'
})
export class ColorInputComponent {
  protected readonly heroEyeDropperMini = heroEyeDropperMini;

  /**
   * Placeholder to display in the input field.
   */
  public readonly placeholder = input.required<string>();
  /**
   * Tooltip to display on the eye dropper icon.
   */
  public readonly tooltip = input.required<string>();
  /**
   * Flag to make the input field read-only.
   */
  public readonly readOnly = input(false);
  /**
   * Hex color value.
   */
  public readonly hex = model.required<string>();
  /**
   * Whether the hex color value is valid.
   */
  public readonly isValid = output<boolean>();

  /**
   * Reference to the hex input element.
   */
  private readonly _hexInput = viewChild.required<ElementRef<HTMLInputElement>>('hexInput');

  /**
   * Whether the color is light.
   */
  protected readonly isColorLight = computed(() => {
    return perceivedBrightnessFromHex(this.hex()) > 51;
  });

  protected readonly iconStyle = computed(() => {
    const color = this.isColorLight() ? 'text-neutral-900' : 'text-neutral-100';
    const readonly = this.readOnly() ? 'cursor-not-allowed' : 'cursor-pointer';

    return `${color} ${readonly}`;
  });

  public constructor() {
    effect(() => {
      this._hexInput().nativeElement.value = this.hex();
    });
  }

  /**
   * Update the hex color value.
   *
   * @param hex Value to update the hex color to.
   */
  protected updateHex(hex: string): void {
    // Remove leading / trailing whitespace and non-hex characters
    hex = hex.trim().replace(/[^0-9a-fA-F]/g, '');

    // Add leading hash if missing
    if (!hex.startsWith('#')) {
      hex = `#${hex}`;
    }

    // Normalize to uppercase and remove extra characters
    hex = hex.toUpperCase().slice(0, 7);

    // Set color if it is a valid hex color
    if (hex.length === 4 || hex.length === 7) {
      this.hex.set(hex);
      this.isValid.emit(true);
    } else {
      this.isValid.emit(false);
    }

    // Update input value
    this._hexInput().nativeElement.value = hex;
  }
}
