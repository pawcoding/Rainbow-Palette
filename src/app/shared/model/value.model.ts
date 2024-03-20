import { HSLObject, RGBObject } from '../types/color-format';

export class Value {
  private _hue!: number;
  private _saturation!: number;
  private _lightness!: number;
  private _red!: number;
  private _green!: number;
  private _blue!: number;

  public constructor(value: HSLObject | RGBObject | string) {
    if (typeof value === 'string') {
      this.HEX = value;
    } else if ('R' in value) {
      this.RGB = value;
    } else {
      this.HSL = value;
    }
  }

  public set HSL(value: HSLObject) {
    if (
      value.H < 0 ||
      value.H > 360 ||
      value.S < 0 ||
      value.S > 100 ||
      value.L < 0 ||
      value.L > 100
    ) {
      throw `Color values [${value.H}°, ${value.S}%, ${value.L}%] are not in valid ranges.`;
    }

    this._hue = value.H;
    this._saturation = value.S;
    this._lightness = value.L;

    const rgb = this._HSLtoRGB(this._hue, this._saturation, this._lightness);
    this._red = rgb.R;
    this._green = rgb.G;
    this._blue = rgb.B;
  }

  public get HSL(): HSLObject {
    return {
      H: this._hue,
      S: this._saturation,
      L: this._lightness
    };
  }

  public set RGB(value: RGBObject) {
    if (
      value.R < 0 ||
      value.R > 255 ||
      value.G < 0 ||
      value.G > 255 ||
      value.B < 0 ||
      value.B > 255
    ) {
      throw `rgb(${value.R}, ${value.G}, ${value.B}) is not in valid format.`;
    }

    this._red = value.R;
    this._green = value.G;
    this._blue = value.B;

    const hsl = this._RGBtoHSL(this._red, this._green, this._blue);
    this._hue = hsl.H;
    this._saturation = hsl.S;
    this._lightness = hsl.L;
  }

  public get RGB(): RGBObject {
    return {
      R: this._red,
      G: this._green,
      B: this._blue
    };
  }

  public set HEX(hex: string) {
    if (!hex.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      throw new Error(`Invalid hex color: "${hex}`);
    }

    const rgb = {
      R: parseInt(hex.substring(1, 3), 16),
      G: parseInt(hex.substring(3, 5), 16),
      B: parseInt(hex.substring(5, 7), 16)
    };

    this.RGB = rgb;
  }

  public get HEX(): string {
    const red = this._red.toString(16).padStart(2, '0');
    const green = this._green.toString(16).padStart(2, '0');
    const blue = this._blue.toString(16).padStart(2, '0');

    return `#${red}${green}${blue}`;
  }

  private _RGBtoHSL(red: number, green: number, blue: number): HSLObject {
    const r = red / 255;
    const g = green / 255;
    const b = blue / 255;

    const cMax = Math.max(r, g, b);
    const cMin = Math.min(r, g, b);
    const delta = cMax - cMin;

    const lightness = (cMax + cMin) * 50;
    const saturation =
      delta === 0
        ? 0
        : (100 * delta) / (1 - Math.abs(2 * (lightness / 100) - 1));

    let hue;
    if (delta === 0) hue = 0;
    else if (cMax === r) hue = 60 * (((g - b) / delta) % 6);
    else if (cMax === g) hue = 60 * ((b - r) / delta + 2);
    else hue = 60 * ((r - g) / delta + 4);

    if (hue < 0) hue += 360;

    return {
      H: Math.round(hue),
      S: Math.round(saturation),
      L: Math.round(lightness)
    };
  }

  private _HSLtoRGB(
    hue: number,
    saturation: number,
    lightness: number
  ): RGBObject {
    const h = hue;
    const s = saturation / 100;
    const l = lightness / 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    const r = h < 60 || h >= 300 ? c : h < 120 || h >= 240 ? x : 0;
    const g = h >= 240 ? 0 : h < 60 || h >= 180 ? x : c;
    const b = h < 120 ? 0 : h < 180 || h >= 300 ? x : c;

    return {
      R: Math.round((r + m) * 255),
      G: Math.round((g + m) * 255),
      B: Math.round((b + m) * 255)
    };
  }
}
