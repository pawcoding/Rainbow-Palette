import { Injectable, effect, inject, signal } from '@angular/core';
import { ColorTranslator, Harmony } from 'colortranslator';
import { PaletteScheme } from '../constants/palette-scheme';
import { Color } from '../model/color.model';
import { Palette } from '../model/palette.model';
import { Shade } from '../model/shade.model';
import { ColorNameService } from './color-name.service';
import { ColorService } from './color.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class PaletteService {
  private readonly _colorService = inject(ColorService);
  private readonly _colorNameService = inject(ColorNameService);
  private readonly _toastService = inject(ToastService);

  private readonly _palette = signal<Palette | undefined>(undefined);

  public get palette() {
    return this._palette.asReadonly();
  }

  constructor() {
    effect(() => {
      this._updateVariables();
    });
  }

  public loadPaletteFromLocalStorage(): void {
    const palette = localStorage.getItem('palette');
    if (palette) {

      try {
        this._palette.set(Palette.parse(palette));
      } catch (e) {
        this._toastService.showToast({
          type: 'error',
          message: 'toast.error.palette-load',
        });
      }
    }
  }

  public savePaletteToLocalStorage(): void {
    const palette = this._palette();
    if (palette) {
      localStorage.setItem('palette', palette.toString());
    }
  }

  public async generatePalette(
    hex: string,
    scheme: PaletteScheme
  ): Promise<void> {
    const palette = await this._generatePalette(hex, scheme);

    palette.colors.forEach((color) => {
      this._colorService.regenerateShades(color);
    });

    this._palette.set(palette);
  }

  private async _generatePalette(
    hex: string,
    scheme: PaletteScheme
  ): Promise<Palette> {
    switch (scheme) {
      case PaletteScheme.RAINBOW:
        return await this._generateRainbowPalette(hex);
      case PaletteScheme.MONOCHROME:
        return this._generateMonochromePalette(hex);
      case PaletteScheme.ANALOGOUS:
        return this._generateHarmonyPalette(
          hex,
          Harmony.ANALOGOUS,
          'Analogous'
        );
      case PaletteScheme.COMPLEMENTARY:
        return this._generateHarmonyPalette(
          hex,
          Harmony.COMPLEMENTARY,
          'Complementary'
        );
      case PaletteScheme.SPLIT_COMPLEMENTARY:
        return this._generateHarmonyPalette(
          hex,
          Harmony.SPLIT_COMPLEMENTARY,
          'Split Complementary'
        );
      case PaletteScheme.SQUARE:
        return this._generateHarmonyPalette(hex, Harmony.SQUARE, 'Square');
      case PaletteScheme.TETRADIC:
        return this._generateHarmonyPalette(hex, Harmony.TETRADIC, 'Tetradic');
      case PaletteScheme.TRIADIC:
        return this._generateHarmonyPalette(hex, Harmony.TRIADIC, 'Triadic');
      default:
        return this._generatePalette(hex, this._getRandomScheme());
    }
  }

  private _getRandomScheme(): PaletteScheme {
    const schemes = Object.values(PaletteScheme);
    return schemes[Math.floor(Math.random() * schemes.length)];
  }

  private async _generateRainbowPalette(hex: string): Promise<Palette> {
    const shade = new Shade(-1, new ColorTranslator(hex), true);
    const name = await this._colorNameService.getColorName(shade);
    const color = new Color([shade], name);
    const rainbow = new Palette('Rainbow', [color]);

    /*
     * These are hues that are spaced out across the color wheel
     * to create a rainbow effect
     */
    const rainbowHues = [4, 26, 55, 95, 149, 200, 253];
    let currentHue = rainbowHues.reduce((best, current) =>
      Math.abs(current - shade.hsl.H) < Math.abs(best - shade.hsl.H)
        ? current
        : best
    );
    if (currentHue === 253 && shade.hsl.H > 308) {
      currentHue = 4;
    }

    for (let hue of rainbowHues) {
      if (hue === currentHue) {
        continue;
      }

      const newHue = (shade.hsl.H + (hue - currentHue) + 360) % 360;
      const newSaturation = Math.min(
        100,
        Math.max(0, shade.hsl.S - 20 + Math.floor(Math.random() * 40))
      );
      const newLightness = Math.min(
        100,
        Math.max(0, shade.hsl.L - 20 + Math.floor(Math.random() * 40))
      );
      const newShade = new Shade(
        -1,
        new ColorTranslator({ H: newHue, S: newSaturation, L: newLightness }),
        true
      );

      const newName = await this._colorNameService.getColorName(newShade);

      rainbow.addColor(new Color([newShade], newName));
    }

    return rainbow;
  }

  private _generateMonochromePalette(hex: string): Palette {
    const shade = new Shade(-1, new ColorTranslator(hex), true);

    const monochrome = new Palette('Monochrome', []);

    monochrome.addColor(new Color([shade], 'Primary'));
    monochrome.addColor(
      new Color(
        [
          new Shade(
            -1,
            new ColorTranslator({ H: shade.hsl.H, S: 30, L: 50 }),
            true
          ),
        ],
        'Muted'
      )
    );
    monochrome.addColor(
      new Color(
        [
          new Shade(
            -1,
            new ColorTranslator({ H: shade.hsl.H, S: 2, L: 50 }),
            true
          ),
        ],
        'Gray'
      )
    );

    return monochrome;
  }

  private async _generateHarmonyPalette(
    hex: string,
    harmony: Harmony,
    name: string
  ): Promise<Palette> {
    const harmonyColors = ColorTranslator.getHarmony(hex, harmony);

    const colors: Array<Color> = [];
    for (const hex of harmonyColors) {
      const shade = new Shade(-1, new ColorTranslator(hex), true);
      const name = await this._colorNameService.getColorName(shade);

      colors.push(new Color([shade], name));
    }

    return new Palette(name, colors);
  }

  private _updateVariables(): void {
    const root = document.documentElement;
    const activeProperties: Array<string> = [];
    const palette = this._palette();

    if (palette) {
      for (const color of palette.colors) {
        const name = color.name.replace(/\s+/g, '-').toLowerCase();

        for (const shade of color.shades) {
          const variable = `--color-${name}-${shade.index}`;
          const value = shade.hex;

          root.style.setProperty(variable, value);
          activeProperties.push(variable);
        }
      }
    }

    const allProperties = Array.from(root.style);
    for (const property of allProperties) {
      if (!property.startsWith('--color')) {
        continue;
      }

      if (!activeProperties.includes(property)) {
        root.style.removeProperty(property);
      }
    }
  }
}

export class PaletteServiceMock {
  public palette = signal<Palette | undefined>(
    new Palette('Mock', [new Color([Shade.random()], 'MockColor')])
  );
  public loadPaletteFromLocalStorage(): void {}
  public savePaletteToLocalStorage(): void {}
  public generatePalette(_hex: string, _scheme: PaletteScheme): void {}
}
