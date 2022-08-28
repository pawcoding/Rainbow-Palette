export class ColorConverter {

  static rgbToHsl(color: string) {
    if (!color.startsWith('#') || color.length !== 7)
      throw `Color '${color}' is not in form #RRGGBB.`

    const r = parseInt(color.substring(1, 3), 16) / 255
    const g = parseInt(color.substring(3, 5), 16) / 255
    const b = parseInt(color.substring(5, 7), 16) / 255

    const cMax = Math.max(r, g, b)
    const cMin = Math.min(r, g, b)
    const d = cMax - cMin

    const l = this.getLightnessFromRgb(cMax, cMin)
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

  private static getLightnessFromRgb(cMax: number, cMin: number): number {
    return (cMax + cMin) * 50
  }

  private static getSaturation(d: number, l: number): number {
    if (d === 0)
      return 0
    else
      return 100 * d / (1 - Math.abs(2 * (l / 100) - 1))
  }

  private static getHue(d: number, cMax: number, r: number, g: number, b: number): number {
    if (d === 0)
      return 0
    else if (cMax === r)
      return 60 * ( ( (g - b) / d) % 6)
    else if (cMax === g)
      return 60 * ( ( (b - r) / d) + 2)
    else
      return 60 * ( ( (r - g) / d) + 4)
  }


  static hslToRgb(hue: number, saturation: number, lightness: number): string {
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

}
