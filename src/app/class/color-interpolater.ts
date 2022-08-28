import {ColorConverter} from "./color-converter";
import {Shade} from "../models/shade.model";

export class ColorInterpolater {

  static interpolateShades(color: string) {
    if (!color.startsWith('#') || color.length !== 7)
      throw `Color '${color}' is not in form #RRGGBB.`

    const shades: Shade[] = []
    const hsl = ColorConverter.rgbToHsl(color)

    if (100 - hsl.luminosity < 7.5) {
      shades.push(new Shade(50, color))
      this.generateDarkerColors(hsl, 0, shades)
    } else if (100 - hsl.luminosity >= 85) {
      shades.push(new Shade(900, color))
      this.generateLighterColors(hsl, 900, shades)
    } else {
      let index = 100
      while (100 - hsl.luminosity > (index / 10) + 5)
        index += 100
      shades.push(new Shade(index, color))
      this.generateLighterColors(hsl, index, shades)
      this.generateDarkerColors(hsl, index, shades)
    }

    return shades
  }

  private static generateLighterColors(hslColor: { saturation: number; hue: number; luminosity: number }, step: number, shades: Shade[]) {
    const index = step / 100
    let i = 1

    for (; i < index; i++) {
      const interpolatedLuminosity = hslColor.luminosity + (i / index) * (100 - hslColor.luminosity)
      const newIndex = step - i * 100
      shades.push(new Shade(newIndex, hslColor.hue, hslColor.saturation, interpolatedLuminosity))
    }

    const interpolatedLuminosity = hslColor.luminosity + ((2 * i - 1) / (2 * index)) * (100 - hslColor.luminosity)
    shades.push(new Shade(50, hslColor.hue, hslColor.saturation, interpolatedLuminosity))
  }

  private static generateDarkerColors(hslColor: { saturation: number; hue: number; luminosity: number }, step: number, shades: Shade[]) {
    const index = (1000 - step) / 100
    let i = 1

    for (; i < index; i++) {
      const interpolatedLuminosity = hslColor.luminosity - (i / index) * hslColor.luminosity
      const newIndex = step + i * 100
      shades.push(new Shade(newIndex, hslColor.hue, hslColor.saturation, interpolatedLuminosity))
    }
  }

}
