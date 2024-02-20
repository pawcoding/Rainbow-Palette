import { Injectable, inject } from '@angular/core';
import { ColorTranslator, Harmony } from 'colortranslator';
import { PaletteScheme } from '../constants/palette-scheme';
import { Color } from '../model/color.model';
import { Palette } from '../model/palette.model';
import { Shade } from '../model/shade.model';
import { ColorService } from './color.service';

@Injectable({
  providedIn: 'root',
})
export class PaletteService {
  private readonly _colorService = inject(ColorService);

  public generatePalette(hex: string, scheme: PaletteScheme): Palette {
    const palette = this._generatePalette(hex, scheme);

    palette.colors.forEach((color) => {
      this._colorService.regenerateShades(color);
    });

    return palette;
  }

  private _generatePalette(hex: string, scheme: PaletteScheme): Palette {
    switch (scheme) {
      case PaletteScheme.RAINBOW:
        return this._generateRainbowPalette(hex);
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

  private _generateRainbowPalette(hex: string): Palette {
    const shade = new Shade(-1, new ColorTranslator(hex), true);
    const color = new Color([shade]);
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

      rainbow.addColor(new Color([newShade]));
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

  private _generateHarmonyPalette(
    hex: string,
    harmony: Harmony,
    name: string
  ): Palette {
    const harmonyColors = ColorTranslator.getHarmony(hex, harmony);

    const colors = harmonyColors.map(
      (hex) => new Color([new Shade(-1, new ColorTranslator(hex), true)])
    );

    return new Palette(name, colors);
  }
}
