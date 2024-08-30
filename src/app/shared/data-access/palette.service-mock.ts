import { signal } from '@angular/core';
import { PaletteScheme } from '../constants/palette-scheme';
import { Tailwind, TailwindGrays, TailwindRainbow } from '../constants/tailwind-colors';
import { Color } from '../model/color.model';
import { Palette } from '../model/palette.model';
import { Shade } from '../model/shade.model';

/**
 * The original service is located at ./palette.service.ts
 * This mock in in this separate file to not include the Tailwind example palettes in the production bundle.
 */

export class PaletteServiceMock {
  public readonly palette = signal<Palette | undefined>(
    new Palette('Mock', [new Color([Shade.random()], 'MockColor')], 'test-id')
  );
  public readonly isGenerating = signal(false);
  public loadPaletteFromLocalStorage(id: string, _onlyReturn: boolean): Palette | undefined {
    switch (id) {
      case 'test-id':
        return this.palette();
      case TailwindRainbow.id:
        return TailwindRainbow;
      case TailwindGrays.id:
        return TailwindGrays;
      case Tailwind.id:
        return Tailwind;
      default:
        return undefined;
    }
  }
  public savePaletteToLocalStorage(_upgrade: boolean): void {}
  public duplicatePalette(_name?: string): string {
    return 'test-id';
  }
  public async generatePalette(_hex: string, _scheme: PaletteScheme): Promise<string> {
    return 'test-id';
  }
}
