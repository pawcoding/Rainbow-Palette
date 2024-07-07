import { Injectable, effect, inject, signal } from '@angular/core';
import { PaletteScheme, randomScheme } from '../constants/palette-scheme';
import { LocalStorageKey } from '../enums/local-storage-keys';
import { Value } from '../model';
import { Color } from '../model/color.model';
import { Palette } from '../model/palette.model';
import { Shade } from '../model/shade.model';
import { ColorNameService } from './color-name.service';
import { ColorService } from './color.service';
import { ListService } from './list.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class PaletteService {
  private readonly _colorService = inject(ColorService);
  private readonly _colorNameService = inject(ColorNameService);
  private readonly _toastService = inject(ToastService);
  private readonly _listService = inject(ListService);

  private readonly _palette = signal<Palette | undefined>(undefined);
  private readonly _isGenerating = signal(false);

  public readonly palette = this._palette.asReadonly();
  public readonly isGenerating = this._isGenerating.asReadonly();

  public constructor() {
    // Migrate single palette to list
    this._migratePalette();

    effect(() => {
      this._updateVariables();
    });
  }

  private _migratePalette(): void {
    const oldPalette = localStorage.getItem(LocalStorageKey.PALETTE);
    if (oldPalette) {
      try {
        const palette = Palette.parse(oldPalette);
        localStorage.setItem(`${LocalStorageKey.PALETTE}_${palette.id}`, palette.toString());
        this._listService.add(palette);

        localStorage.removeItem(LocalStorageKey.PALETTE);
      } catch (e) {
        this._toastService.showToast({
          type: 'error',
          message: 'toast.error.palette-load'
        });
      }
    }
  }

  public loadPaletteFromLocalStorage(id: string): void {
    if (this.palette()?.id === id) {
      return;
    }

    // Check if there was a palette stored for an app update
    let palette = localStorage.getItem(LocalStorageKey.PALETTE_TMP);

    if (palette) {
      // Palette was stored for an update, remove it now
      localStorage.removeItem(LocalStorageKey.PALETTE_TMP);
    } else {
      // Load the palette saved by the user
      palette = localStorage.getItem(`${LocalStorageKey.PALETTE}_${id}`);
    }

    if (palette) {
      try {
        this._palette.set(Palette.parse(palette));
      } catch (e) {
        this._toastService.showToast({
          type: 'error',
          message: 'toast.error.palette-load'
        });
      }
    }
  }

  public savePaletteToLocalStorage(upgrade = false): void {
    const palette = this._palette();
    if (palette) {
      if (upgrade) {
        // Store the palette in a different key to reload it in the current state after an app update
        localStorage.setItem(LocalStorageKey.PALETTE_TMP, palette.toString());
      } else {
        localStorage.setItem(`${LocalStorageKey.PALETTE}_${palette.id}`, palette.toString());
        this._listService.add(palette);
      }
    }
  }

  public duplicatePalette(): string {
    const palette = this._palette();
    if (!palette) {
      throw new Error('No palette to duplicate');
    }

    // Copy palette with new id and name
    const copy = palette.copy(false);
    copy.name = `${copy.name} (copy)`;

    // Load the copy
    this._palette.set(copy);
    return copy.id;
  }

  public async generatePalette(hex: string, scheme: PaletteScheme): Promise<string> {
    this._isGenerating.set(true);

    try {
      const palette = await this._generatePalette(hex, scheme);

      for (const color of palette.colors) {
        // Get the color name
        color.name = await this._colorNameService.getColorName(color.shades[0]);

        // Regenerate the shades
        await this._colorService.regenerateShades(color);
      }

      this._palette.set(palette);

      return palette.id;
    } finally {
      this._isGenerating.set(false);
    }
  }

  private async _generatePalette(hex: string, scheme: PaletteScheme): Promise<Palette> {
    switch (scheme) {
      case PaletteScheme.RAINBOW:
        return this._generateRainbowPalette(hex);
      case PaletteScheme.MONOCHROME:
        return this._generateMonochromePalette(hex);
      case PaletteScheme.ANALOGOUS:
        return this._generateAnalogousPalette(hex);
      case PaletteScheme.COMPLEMENTARY:
        return this._generateComplementaryPalette(hex);
      case PaletteScheme.SPLIT_COMPLEMENTARY:
        return this._generateSplitPalette(hex);
      case PaletteScheme.TRIADIC:
        return this._generateTriadicPalette(hex);
      case PaletteScheme.COMPOUND:
        return this._generateCompoundPalette(hex);
      default:
        return this._generatePalette(hex, randomScheme().value);
    }
  }

  private _generateRainbowPalette(hex: string): Palette {
    const shade = new Shade(-1, Value.fromHEX(hex), true);
    let index = 0;
    const color = new Color([shade], `${index++}`);
    const rainbow = new Palette('Rainbow', [color]);

    /*
     * These are hues that are spaced out across the color wheel
     * to create a rainbow effect
     */
    const rainbowHues = [4, 26, 55, 95, 149, 200, 253];
    let currentHue = rainbowHues.reduce((best, current) =>
      Math.abs(current - shade.hsl.H) < Math.abs(best - shade.hsl.H) ? current : best
    );
    if (currentHue === 253 && shade.hsl.H > 308) {
      currentHue = 4;
    }

    for (const hue of rainbowHues) {
      if (hue === currentHue) {
        continue;
      }

      const newHue = (shade.hsl.H + (hue - currentHue) + 360) % 360;
      const newSaturation = Math.min(100, Math.max(0, shade.hsl.S - 20 + Math.floor(Math.random() * 40)));
      const newLightness = Math.min(100, Math.max(0, shade.hsl.L - 20 + Math.floor(Math.random() * 40)));
      const newShade = new Shade(-1, Value.fromHSL({ H: newHue, S: newSaturation, L: newLightness }), true);

      rainbow.addColor(new Color([newShade], `${index++}`));
    }

    return rainbow;
  }

  private _generateMonochromePalette(hex: string): Palette {
    const shade = new Shade(-1, Value.fromHEX(hex), true);

    const monochrome = new Palette('Monochrome', []);

    monochrome.addColor(new Color([shade], 'Primary'));
    monochrome.addColor(new Color([new Shade(-1, Value.fromHSL({ H: shade.hsl.H, S: 30, L: 50 }), true)], 'Muted'));
    monochrome.addColor(new Color([new Shade(-1, Value.fromHSL({ H: shade.hsl.H, S: 2, L: 50 }), true)], 'Gray'));

    return monochrome;
  }

  private _generateAnalogousPalette(hex: string): Palette {
    const shade = new Shade(-1, Value.fromHEX(hex), true);

    const analogous = new Palette('Analogous', []);

    analogous.addColor(new Color([shade], 'Primary'));

    analogous.addColor(
      new Color(
        [
          new Shade(
            -1,
            Value.fromHSL({
              H: this._changeHueOnWheel(shade.hsl.H, 315),
              S: Math.max(shade.hsl.S - 20, 0),
              L: 40
            }),
            true
          )
        ],
        'Secondary'
      )
    );
    analogous.addColor(
      new Color(
        [
          new Shade(
            -1,
            Value.fromHSL({
              H: this._changeHueOnWheel(shade.hsl.H, 270),
              S: 25,
              L: 20
            }),
            true
          )
        ],
        'Secondary Muted'
      )
    );

    analogous.addColor(
      new Color(
        [
          new Shade(
            -1,
            Value.fromHSL({
              H: this._changeHueOnWheel(shade.hsl.H, 45),
              S: shade.hsl.S,
              L: 50
            }),
            true
          )
        ],
        'Accent'
      )
    );
    analogous.addColor(
      new Color(
        [
          new Shade(
            -1,
            Value.fromHSL({
              H: this._changeHueOnWheel(shade.hsl.H, 90),
              S: 25,
              L: 20
            }),
            true
          )
        ],
        'Accent Muted'
      )
    );

    return analogous;
  }

  private _generateComplementaryPalette(hex: string): Palette {
    const shade = new Shade(-1, Value.fromHEX(hex), true);

    const complementary = new Palette('Complementary', []);

    complementary.addColor(new Color([shade], 'Primary'));

    complementary.addColor(
      new Color(
        [
          new Shade(
            -1,
            Value.fromHSL({
              H: shade.hsl.H,
              S: 3,
              L: 50
            }),
            true
          )
        ],
        'Gray'
      )
    );

    complementary.addColor(
      new Color(
        [
          new Shade(
            -1,
            Value.fromHSL({
              H: this._changeHueOnWheel(shade.hsl.H, 180),
              S: Math.max(shade.hsl.S - 20, 0),
              L: 40
            }),
            true
          )
        ],
        'Secondary'
      )
    );

    return complementary;
  }

  private _generateSplitPalette(hex: string): Palette {
    const shade = new Shade(-1, Value.fromHEX(hex), true);

    const split = new Palette('Split', []);

    split.addColor(new Color([shade], 'Primary'));

    split.addColor(
      new Color(
        [
          new Shade(
            -1,
            Value.fromHSL({
              H: this._changeHueOnWheel(shade.hsl.H, 20),
              S: Math.max(shade.hsl.S - 20, 0),
              L: 40
            }),
            true
          )
        ],
        'Secondary'
      )
    );
    split.addColor(
      new Color(
        [
          new Shade(
            -1,
            Value.fromHSL({
              H: this._changeHueOnWheel(shade.hsl.H, 20),
              S: 3,
              L: 50
            }),
            true
          )
        ],
        'Gray'
      )
    );

    split.addColor(
      new Color(
        [
          new Shade(
            -1,
            Value.fromHSL({
              H: this._changeHueOnWheel(shade.hsl.H, 180),
              S: shade.hsl.S,
              L: 80
            }),
            true
          )
        ],
        'Accent'
      )
    );

    return split;
  }

  private _generateTriadicPalette(hex: string): Palette {
    const shade = new Shade(-1, Value.fromHEX(hex), true);

    const triadic = new Palette('Triadic', []);

    triadic.addColor(new Color([shade], 'Primary'));

    triadic.addColor(
      new Color([new Shade(-1, Value.fromHSL({ H: shade.hsl.H, S: 20, L: 30 }), true)], 'Primary Muted')
    );

    triadic.addColor(
      new Color(
        [
          new Shade(
            -1,
            Value.fromHSL({
              H: this._changeHueOnWheel(shade.hsl.H, 120),
              S: Math.max(shade.hsl.S - 20, 0),
              L: 40
            }),
            true
          )
        ],
        'Secondary'
      )
    );
    triadic.addColor(
      new Color(
        [
          new Shade(
            -1,
            Value.fromHSL({
              H: this._changeHueOnWheel(shade.hsl.H, 120),
              S: 20,
              L: 30
            }),
            true
          )
        ],
        'Secondary Muted'
      )
    );

    triadic.addColor(
      new Color(
        [
          new Shade(
            -1,
            Value.fromHSL({
              H: this._changeHueOnWheel(shade.hsl.H, 240),
              S: shade.hsl.S,
              L: 80
            }),
            true
          )
        ],
        'Accent'
      )
    );

    return triadic;
  }

  private _generateCompoundPalette(hex: string): Palette {
    const shade = new Shade(-1, Value.fromHEX(hex), true);

    const compound = new Palette('Compound', []);

    compound.addColor(new Color([shade], 'Primary'));

    compound.addColor(
      new Color(
        [
          new Shade(
            -1,
            Value.fromHSL({
              H: this._changeHueOnWheel(shade.hsl.H, 210),
              S: Math.max(shade.hsl.S - 20, 0),
              L: 40
            }),
            true
          )
        ],
        'Secondary'
      )
    );

    compound.addColor(
      new Color(
        [
          new Shade(
            -1,
            Value.fromHSL({
              H: this._changeHueOnWheel(shade.hsl.H, 150),
              S: shade.hsl.S,
              L: 50
            }),
            true
          )
        ],
        'Accent'
      )
    );

    return compound;
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

  private _changeHueOnWheel(hue: number, change: number): number {
    let wheel;
    if (hue < 60) wheel = 2 * hue;
    else if (hue < 120) wheel = hue + 60;
    else if (hue < 240) wheel = 0.5 * hue + 120;
    else wheel = hue;

    wheel += change;
    wheel %= 360;

    let newHue;
    if (wheel < 120) newHue = 0.5 * wheel;
    else if (wheel < 180) newHue = wheel + 300;
    else if (wheel < 240) newHue = 2 * wheel + 120;
    else newHue = wheel;

    return newHue % 360;
  }
}

export class PaletteServiceMock {
  public palette = signal<Palette | undefined>(
    new Palette('Mock', [new Color([Shade.random()], 'MockColor')], 'test-id')
  );
  public isGenerating = signal(false);
  public loadPaletteFromLocalStorage(): void {}
  public savePaletteToLocalStorage(): void {}
  public generatePalette(_hex: string, _scheme: PaletteScheme): string {
    return 'test-id';
  }
}
