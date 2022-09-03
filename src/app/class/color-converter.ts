export class ColorConverter {

  /**
   * Convert from HEX string (#RRGGBB) to HSL format.
   * @param hex HEX color sting (#RRGGBB)
   * @constructor
   */
  static HEXtoHSL(hex: string) {
    if (!hex.startsWith('#') || hex.length !== 7)
      throw `Color '${hex}' is not in form #RRGGBB.`

    const rgb = this.HEXtoRGB(hex)
    const r = rgb.red / 255
    const g = rgb.green / 255
    const b = rgb.blue / 255

    const cMax = Math.max(r, g, b)
    const cMin = Math.min(r, g, b)
    const d = cMax - cMin

    const l = this.getLuminosity(cMax, cMin)
    const s = this.getSaturation(d, l)
    let h = this.getHue(d, cMax, r, g, b)
    if (h < 0)
      h += 360

    return {
      hue: Math.round(h),
      saturation: Math.round(s),
      luminosity: Math.round(l)
    }
  }

  /**
   * Get luminosity for HSL format.
   * @param cMax Max value from [red, green, blue] / 255
   * @param cMin Min value from [red, green, blue] / 255
   * @private
   */
  private static getLuminosity(cMax: number, cMin: number): number {
    return (cMax + cMin) * 50
  }

  /**
   * Get saturation for HSL format.
   * @param delta Difference between max and min values from [red, green, blue] / 255
   * @param luminosity Luminosity from HSL format.
   * @private
   */
  private static getSaturation(delta: number, luminosity: number): number {
    if (delta === 0)
      return 0
    else
      return 100 * delta / (1 - Math.abs(2 * (luminosity / 100) - 1))
  }

  /**
   * Get hue for HSL or HSB format.
   * @param delta Difference between max and min values from [red, green, blue] / 255
   * @param cMax Max value from [red, green, blue] / 255
   * @param red Red value between 0 - 1
   * @param green Green value between 0 - 1
   * @param blue Blue value between 0 - 1
   * @private
   */
  private static getHue(delta: number, cMax: number, red: number, green: number, blue: number): number {
    if (delta === 0)
      return 0
    else if (cMax === red)
      return 60 * ( ( (green - blue) / delta) % 6)
    else if (cMax === green)
      return 60 * ( ( (blue - red) / delta) + 2)
    else
      return 60 * ( ( (red - green) / delta) + 4)
  }

  /**
   * Convert color from HSL format into HEX string.
   * @param hue Hue between 0 - 360
   * @param saturation Saturation between 0 - 100
   * @param lightness Lightness between 0 - 100
   * @constructor
   */
  static HSLtoHEX(hue: number, saturation: number, lightness: number): string {
    if (hue < 0 || hue > 360 || saturation < 0 || saturation > 100 || lightness < 0 || lightness > 100)
      throw `Color values [${hue}°, ${saturation}%, ${lightness}%] are not in valid ranges.`

    const h = hue
    const s = saturation / 100
    const l = lightness / 100

    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs((h / 60) % 2 - 1))
    const m = l - c / 2

    const r = (h < 60 || h >=300) ? c : (h < 120 || h >= 240) ? x : 0
    const g = (h >= 240) ? 0 : (h < 60 || h >= 180) ? x : c
    const b = (h < 120) ? 0 : (h < 180 || h >= 300) ? x : c

    const R = Math.round((r + m) * 255)
    const G = Math.round((g + m) * 255)
    const B = Math.round((b + m) * 255)

    return `#${(R < 16 ? 0 : '') + R.toString(16)}${(G < 16 ? 0 : '') + G.toString(16)}${(B < 16 ? 0 : '') + B.toString(16)}`
  }

  /**
   * Convert from HEX string to RGB values.
   * @param hex HEX color string (#RRGGBB)
   * @constructor
   */
  static HEXtoRGB(hex: string) {
    if (!hex.startsWith('#') || hex.length !== 7)
      throw `Color ${hex} is not in form #RRGGBB.`

    return {
      red: parseInt(hex.substring(1, 3), 16),
      green: parseInt(hex.substring(3, 5), 16),
      blue: parseInt(hex.substring(5, 7), 16)
    }
  }

}
