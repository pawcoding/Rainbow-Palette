import { Injectable, signal } from '@angular/core';
import { PaletteScheme } from '../../shared/constants/palette-scheme';
import { LocalStorageKey } from '../../shared/enums/local-storage-keys';

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
      LocalStorageKey.LAST_GENERATION_SETTINGS,
      JSON.stringify({ hex: this.hex(), scheme: this.scheme() })
    );
  }

  public loadGenerationSettings(): void {
    const lastGeneration = localStorage.getItem(
      LocalStorageKey.LAST_GENERATION_SETTINGS
    );

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
      localStorage.removeItem(LocalStorageKey.LAST_GENERATION_SETTINGS);
    }
  }
}

export class HomeServiceMock {
  public readonly hex = signal('#3B82F6');
  public readonly scheme = signal(PaletteScheme.RAINBOW);

  public saveGenerationSettings(): void {}
  public loadGenerationSettings(): void {}
}
