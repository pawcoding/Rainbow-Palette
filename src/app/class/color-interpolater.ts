import {ColorConverter} from "./color-converter";
import {Shade} from "../models/shade.model";

export class ColorInterpolater {

  /**
   * Interpolate 10 shades starting with one HEX color string.
   * @param hex HEX color string (#RRGGBB)
   */
  static interpolateShades(hex: string) {
    if (!hex.startsWith('#') || hex.length !== 7)
      throw `Color '${hex}' is not in form #RRGGBB.`

    const shades: Shade[] = []
    const hsl = ColorConverter.HEXtoHSL(hex)

    if (100 - hsl.luminosity < 7.5) {
      shades.push(new Shade(50, hex))
      this.generateDarkerColors(hsl, 0, shades)
    } else if (100 - hsl.luminosity >= 85) {
      shades.push(new Shade(900, hex))
      this.generateLighterColors(hsl, 900, shades)
    } else {
      let index = 100
      while (100 - hsl.luminosity > (index / 10) + 5)
        index += 100
      shades.push(new Shade(index, hex))
      this.generateLighterColors(hsl, index, shades)
      this.generateDarkerColors(hsl, index, shades)
    }

    return shades
  }

  /**
   * Interpolate all lighter shades from HSL color.
   * @param hsl Color in HSL format
   * @param index Index of HSL color shade
   * @param shades Array to add all generated shades
   * @private
   */
  private static generateLighterColors(hsl: { saturation: number; hue: number; luminosity: number }, index: number, shades: Shade[]) {
    const step = index / 100
    let i = 1

    for (; i < step; i++) {
      const interpolatedLuminosity = hsl.luminosity + (i / step) * (100 - hsl.luminosity)
      const newIndex = index - i * 100
      shades.push(new Shade(newIndex, hsl.hue, hsl.saturation, interpolatedLuminosity))
    }

    const interpolatedLuminosity = hsl.luminosity + ((2 * i - 1) / (2 * step)) * (100 - hsl.luminosity)
    shades.push(new Shade(50, hsl.hue, hsl.saturation, interpolatedLuminosity))
  }

  /**
   * Interpolate all darker shades from HSL color.
   * @param hsl Color in HSL format
   * @param index Index of HSL color shade
   * @param shades Array to add all generated shades
   * @private
   */
  private static generateDarkerColors(hsl: { saturation: number; hue: number; luminosity: number }, index: number, shades: Shade[]) {
    const step = (1000 - index) / 100
    let i = 1

    for (; i < step; i++) {
      const interpolatedLuminosity = hsl.luminosity - (i / step) * hsl.luminosity
      const newIndex = index + i * 100
      shades.push(new Shade(newIndex, hsl.hue, hsl.saturation, interpolatedLuminosity))
    }
  }

}
