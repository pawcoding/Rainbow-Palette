import { Injectable, signal } from '@angular/core';
import { PaletteScheme } from '../../shared/constants/palette-scheme';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  public readonly hex = signal('#3B82F6');
  public readonly scheme = signal(PaletteScheme.RAINBOW);

  constructor() {
    this.loadGenerationSettings();
  }

  public saveGenerationSettings(): void {
    localStorage.setItem(
      'lastGeneration',
      JSON.stringify({ hex: this.hex(), scheme: this.scheme() })
    );
  }

  public loadGenerationSettings(): void {
    const lastGeneration = localStorage.getItem('lastGeneration');

    if (!lastGeneration) {
      return;
    }

    try {
      const { hex, scheme } = JSON.parse(lastGeneration);

      if (hex) {
        this.hex.set(hex);
      }

      if (scheme) {
        this.scheme.set(scheme);
      }
    } catch {
      localStorage.removeItem('lastGeneration');
    }
  }
}
