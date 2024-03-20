import { Component, ElementRef, computed, effect, input, model, viewChild } from '@angular/core';
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
  public readonly placeholder = input.required<string>();
  public readonly tooltip = input.required<string>();
  public readonly hex = model.required<string>();
  public readonly isValid = model(true);

  private readonly _hexInput = viewChild.required<ElementRef<HTMLInputElement>>('hexInput');

  protected readonly heroEyeDropperMini = heroEyeDropperMini;

  protected readonly isColorLight = computed(() => {
    return perceivedBrightnessFromHex(this.hex()) > 51;
  });

  public constructor() {
    effect(() => {
      this._hexInput().nativeElement.value = this.hex();
    });
  }

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
      this.isValid.set(true);
    } else {
      this.isValid.set(false);
    }

    // Update input value
    this._hexInput().nativeElement.value = hex;
  }
}
