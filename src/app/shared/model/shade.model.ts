import { ColorTranslator, HSLObject } from 'colortranslator';
import { perceivedBrightnessFromRGB } from '../utils/perceived-brightness';

export class Shade {
  public index: number;
  public fixed: boolean;
  private _value: ColorTranslator;
  private _perceivedBrightness?: number;

  constructor(index: number, value: ColorTranslator, fixed = false) {
    this.index = index;
    this._value = value;
    this.fixed = fixed;
  }

  public get hslValue(): string {
    return this._value.HSL;
  }

  public get hsl(): HSLObject {
    return this._value.HSLObject;
  }

  public get value(): HSLObject {
    return this._value.HSLObject;
  }

  public set hsl(hsl: HSLObject) {
    this._value.setH(hsl.H);
    this._value.setS(hsl.S);
    this._value.setL(hsl.L);

    this._perceivedBrightness = undefined;
  }

  public get hex(): string {
    return this._value.HEX.toUpperCase();
  }

  public set hex(hex: string) {
    if (!hex.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      throw new Error(`Invalid hex color: "${hex}`);
    }

    this._value.setR(parseInt(hex.substring(1, 2), 16));
    this._value.setG(parseInt(hex.substring(3, 2), 16));
    this._value.setB(parseInt(hex.substring(5, 2), 16));

    this._perceivedBrightness = undefined;
  }

  public get perceivedBrightness(): number {
    if (this._perceivedBrightness !== undefined) {
      return this._perceivedBrightness;
    }

    this._perceivedBrightness = perceivedBrightnessFromRGB(
      this._value.R,
      this._value.G,
      this._value.B
    );

    return this._perceivedBrightness;
  }

  public copy(): Shade {
    return new Shade(this.index, new ColorTranslator(this.hex), this.fixed);
  }

  public static random(): Shade {
    const h = Math.floor(Math.random() * 360);
    const s = 30 + Math.floor(Math.random() * 60);
    const l = 25 + Math.floor(Math.random() * 50);

    const value = new ColorTranslator({ H: h, S: s, L: l });
    return new Shade(0, value, true);
  }

  public static parse(shade: string | object): Shade {
    if (typeof shade === 'string') {
      try {
        shade = JSON.parse(shade);
      } catch (e) {
        throw new Error(`Could not parse shade (not a valid JSON): "${shade}"`);
      }
    }

    if (!(shade instanceof Object)) {
      throw new Error(`Could not parse shade (not an object): "${shade}"`);
    }

    let index = 0;
    if ('index' in shade && typeof shade.index === 'number') {
      index = shade.index;
    }

    let fixed = false;
    if ('fixed' in shade && typeof shade.fixed === 'boolean') {
      fixed = shade.fixed;
    }

    if (!('value' in shade)) {
      if ('hex' in shade && typeof shade.hex === 'string') {
        return new Shade(
          index,
          new ColorTranslator(shade.hex, { decimals: 2 }),
          fixed
        );
      }

      throw new Error(
        `Could not parse shade (missing "value" property): "${shade}"`
      );
    }

    let value: ColorTranslator | undefined;
    if (
      typeof shade.value === 'string' &&
      shade.value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    ) {
      value = new ColorTranslator(shade.value, { decimals: 2 });
    } else if (typeof shade.value === 'object') {
      const hsl = shade.value as HSLObject;
      if (
        'H' in hsl &&
        'S' in hsl &&
        'L' in hsl &&
        typeof hsl.H === 'number' &&
        (typeof hsl.S === 'number' || typeof hsl.S === 'string') &&
        (typeof hsl.L === 'number' || typeof hsl.L === 'string')
      ) {
        value = new ColorTranslator(hsl, { decimals: 2 });
      }
    }

    if (value === undefined) {
      throw new Error(
        `Could not parse shade (invalid "value" property): "${shade.value}"`
      );
    }

    return new Shade(index, value, fixed);
  }

  public toJSON(): object {
    return {
      index: this.index,
      fixed: this.fixed,
      value: this._value.HSLObject,
    };
  }

  public toString(): string {
    return JSON.stringify(this.toJSON());
  }
}
