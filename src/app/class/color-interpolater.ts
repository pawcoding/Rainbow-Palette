import {ColorConverter} from "./color-converter";

export class ColorInterpolater {

  static generatePalette(color: string) {
    if (!color.startsWith('#') || color.length !== 7)
      throw `Color '${color}' is not in form #RRGGBB.`

    const hsl = ColorConverter.rgbToHsl(color)

    const colors = {
      50: '#000000',
      100: '#000000',
      200: '#000000',
      300: '#000000',
      400: '#000000',
      500: '#000000',
      600: '#000000',
      700: '#000000',
      800: '#000000',
      900: '#000000'
    }

    if (100 - hsl.l < 7.5) {
      colors[50] = color
      this.generateDarkerColors(hsl, 0, colors)
    } else if (100 - hsl.l >= 85) {
      colors[900] = color
      this.generateLighterColors(hsl, 900, colors)
    } else {
      let index = 100
      while (100 - hsl.l > (index / 10) + 5)
        index += 100
      // @ts-ignore
      colors[index] = color
      this.generateLighterColors(hsl, index, colors)
      this.generateDarkerColors(hsl, index, colors)
    }

    return colors
  }

  private static generateLighterColors(hslColor: { s: number; h: number; l: number }, step: number, colors: { "100": string; "200": string; "300": string; "400": string; "500": string; "600": string; "700": string; "800": string; "900": string; "50": string }) {
    let i = step / 100
    let index = 1

    while (index < i) {
      let interpolate = hslColor.l + (index / i) * (100 - hslColor.l)
      // @ts-ignore
      colors[step - index * 100] = ColorConverter.hslToRgb(hslColor.h, hslColor.s, interpolate)
      index++
    }

    let interpolate = hslColor.l + ((2*index - 1) / (2 * i)) * (100 - hslColor.l)
    colors[50] = ColorConverter.hslToRgb(hslColor.h, hslColor.s, interpolate)
  }

  private static generateDarkerColors(hslColor: { s: number; h: number; l: number }, step: number, colors: { "100": string; "200": string; "300": string; "400": string; "500": string; "600": string; "700": string; "800": string; "900": string; "50": string }) {
    let i = (1000 - step) / 100
    let index = 1

    while (index < i) {
      let interpolate = hslColor.l - (index / i) * (hslColor.l)
      // @ts-ignore
      colors[step + index * 100] = ColorConverter.hslToRgb(hslColor.h, hslColor.s, interpolate)
      index++
    }
  }

}
