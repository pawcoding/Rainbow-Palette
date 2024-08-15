import { computed, inject, Injectable } from '@angular/core';
import confetti from 'canvas-confetti';
import { PaletteService } from './palette.service';

@Injectable({
  providedIn: 'root'
})
export class ConfettiService {
  readonly #paletteService = inject(PaletteService);

  /**
   * Hex colors of the current palette
   */
  readonly #colors = computed<Array<string> | undefined>(() => {
    // Check if palette is present
    const palette = this.#paletteService.palette();
    if (!palette || !palette.colors) {
      return undefined;
    }

    // Get all hex codes of all shades in palette
    return palette.colors.flatMap((color) => color.shades.map((shade) => shade.hex));
  });

  /**
   * Shoot confetti in the colors of the current palette
   */
  public confetti(configs: Array<Omit<confetti.Options, 'colors' | 'zIndex'>>): void {
    // Trigger all given confetti configs
    for (const config of configs) {
      confetti({ ...config, colors: this.#colors(), zIndex: 1001 });
    }
  }
}

export class ConfettiServiceMock {
  public confetti(_configs: Array<Omit<confetti.Options, 'colors' | 'zIndex'>>): void {}
}
