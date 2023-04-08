export class ColorConverter {
  static HEXtoRGB(hex: string) {
    if (!hex.match(/^#[0-9A-Fa-f]{6}$/))
      throw `Color ${hex} is not in form #RRGGBB.`

    return {
      red: parseInt(hex.substring(1, 3), 16),
      green: parseInt(hex.substring(3, 5), 16),
      blue: parseInt(hex.substring(5, 7), 16),
    }
  }

  static HEXtoHSL(hex: string) {
    const rgb = this.HEXtoRGB(hex)
    return this.RGBtoHSL(rgb.red, rgb.green, rgb.blue)
  }

  static HEXtoHSV(hex: string) {
    const hsl = this.HEXtoHSL(hex)
    return this.HSLtoHSV(hsl.hue, hsl.saturation, hsl.luminosity)
  }

  static HEXtoCMYK(hex: string) {
    const rgb = this.HEXtoRGB(hex)
    return this.RGBtoCMYK(rgb.red, rgb.green, rgb.blue)
  }

  static RGBtoHEX(red: number, green: number, blue: number) {
    if (
      red < 0 ||
      red > 255 ||
      green < 0 ||
      green > 255 ||
      blue < 0 ||
      blue > 255
    )
      throw `rgb(${red}, ${green}, ${blue}) is not in valid format.`

    return `#${(red < 16 ? 0 : '') + red.toString(16).toUpperCase()}${
      (green < 16 ? 0 : '') + green.toString(16).toUpperCase()
    }${(blue < 16 ? 0 : '') + blue.toString(16).toUpperCase()}`
  }

  static RGBtoHSL(red: number, green: number, blue: number) {
    if (
      red < 0 ||
      red > 255 ||
      green < 0 ||
      green > 255 ||
      blue < 0 ||
      blue > 255
    )
      throw `rgb(${red}, ${green}, ${blue}) is not in valid format.`

    const r = red / 255
    const g = green / 255
    const b = blue / 255

    const cMax = Math.max(r, g, b)
    const cMin = Math.min(r, g, b)
    const delta = cMax - cMin

    const luminosity = (cMax + cMin) * 50
    const saturation =
      delta === 0
        ? 0
        : (100 * delta) / (1 - Math.abs(2 * (luminosity / 100) - 1))

    let hue
    if (delta === 0) hue = 0
    else if (cMax === r) hue = 60 * (((g - b) / delta) % 6)
    else if (cMax === g) hue = 60 * ((b - r) / delta + 2)
    else hue = 60 * ((r - g) / delta + 4)

    if (hue < 0) hue += 360

    return {
      hue: Math.round(hue),
      saturation: Math.round(saturation),
      luminosity: Math.round(luminosity),
    }
  }

  static RGBtoHSV(red: number, green: number, blue: number) {
    const hsl = this.RGBtoHSL(red, green, blue)
    return this.HSLtoHSV(hsl.hue, hsl.saturation, hsl.luminosity)
  }

  static RGBtoCMYK(red: number, green: number, blue: number) {
    if (
      red < 0 ||
      red > 255 ||
      green < 0 ||
      green > 255 ||
      blue < 0 ||
      blue > 255
    )
      throw `rgb(${red}, ${green}, ${blue}) is not in valid format.`

    const r = red / 255
    const g = green / 255
    const b = blue / 255

    const k = 1 - Math.max(r, g, b)
    const c = (1 - r - k) / (1 - k)
    const m = (1 - g - k) / (1 - k)
    const y = (1 - b - k) / (1 - k)

    return {
      cyan: Math.round(c * 100),
      magenta: Math.round(m * 100),
      yellow: Math.round(y * 100),
      key: Math.round(k * 100),
    }
  }

  static HSLtoHEX(hue: number, saturation: number, luminosity: number): string {
    const rgb = this.HSLtoRGB(hue, saturation, luminosity)
    return this.RGBtoHEX(rgb.red, rgb.green, rgb.blue)
  }

  static HSLtoRGB(hue: number, saturation: number, luminosity: number) {
    if (
      hue < 0 ||
      hue > 360 ||
      saturation < 0 ||
      saturation > 100 ||
      luminosity < 0 ||
      luminosity > 100
    )
      throw `Color values [${hue}°, ${saturation}%, ${luminosity}%] are not in valid ranges.`

    const h = hue
    const s = saturation / 100
    const l = luminosity / 100

    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = l - c / 2

    const r = h < 60 || h >= 300 ? c : h < 120 || h >= 240 ? x : 0
    const g = h >= 240 ? 0 : h < 60 || h >= 180 ? x : c
    const b = h < 120 ? 0 : h < 180 || h >= 300 ? x : c

    return {
      red: Math.round((r + m) * 255),
      green: Math.round((g + m) * 255),
      blue: Math.round((b + m) * 255),
    }
  }

  static HSLtoHSV(hue: number, saturation: number, luminosity: number) {
    if (
      hue < 0 ||
      hue > 360 ||
      saturation < 0 ||
      saturation > 100 ||
      luminosity < 0 ||
      luminosity > 100
    )
      throw `Color values [${hue}°, ${saturation}%, ${luminosity}%] are not in valid ranges.`

    const v = luminosity + saturation * Math.min(luminosity, 1 - luminosity)

    const s = v === 0 ? 0 : 2 * (1 - luminosity / v)

    return {
      hue: hue,
      saturation: Math.round(s),
      value: Math.round(v),
    }
  }

  static HSLtoCMYK(hue: number, saturation: number, luminosity: number) {
    const rgb = this.HSLtoRGB(hue, saturation, luminosity)
    return this.RGBtoCMYK(rgb.red, rgb.green, rgb.blue)
  }

  static HSVtoHEX(hue: number, saturation: number, value: number) {
    const rgb = this.HSVtoRGB(hue, saturation, value)
    return this.RGBtoHEX(rgb.red, rgb.green, rgb.blue)
  }

  static HSVtoRGB(hue: number, saturation: number, value: number) {
    const hsl = this.HSVtoHSL(hue, saturation, value)
    return this.HSLtoRGB(hsl.hue, hsl.saturation, hsl.luminosity)
  }

  static HSVtoHSL(hue: number, saturation: number, value: number) {
    if (
      hue < 0 ||
      hue > 360 ||
      saturation < 0 ||
      saturation > 100 ||
      value < 0 ||
      value > 100
    )
      throw `Color values [${hue}°, ${saturation}%, ${value}%] are not in valid ranges.`

    const l = value * (1 - saturation / 2)

    const s = l === 0 || l === 1 ? 0 : (value - l) / Math.min(l, 1 - l)

    return {
      hue: hue,
      saturation: Math.round(s),
      luminosity: Math.round(l),
    }
  }

  static HSVtoCMYK(hue: number, saturation: number, value: number) {
    const rgb = this.HSVtoRGB(hue, saturation, value)
    return this.RGBtoCMYK(rgb.red, rgb.green, rgb.blue)
  }

  static CMYKtoHEX(cyan: number, magenta: number, yellow: number, key: number) {
    const rgb = this.CMYKtoRGB(cyan, magenta, yellow, key)
    return this.RGBtoHEX(rgb.red, rgb.green, rgb.blue)
  }

  static CMYKtoRGB(cyan: number, magenta: number, yellow: number, key: number) {
    if (
      cyan < 0 ||
      cyan > 100 ||
      magenta < 0 ||
      magenta > 100 ||
      yellow < 0 ||
      yellow > 100 ||
      key < 0 ||
      key > 100
    )
      throw `[${cyan}, ${magenta}, ${yellow}, ${key}] is not in valid format.`

    const c = cyan / 100
    const m = magenta / 100
    const y = yellow / 100
    const k = key / 100

    const r = (1 - c) * (1 - k)
    const g = (1 - m) * (1 - k)
    const b = (1 - y) * (1 - k)

    return {
      red: Math.round(255 * r),
      green: Math.round(255 * g),
      blue: Math.round(255 * b),
    }
  }

  static CMYKtoHSL(cyan: number, magenta: number, yellow: number, key: number) {
    const rgb = this.CMYKtoRGB(cyan, magenta, yellow, key)
    return this.RGBtoHSL(rgb.red, rgb.green, rgb.blue)
  }

  static CMYKtoHSV(cyan: number, magenta: number, yellow: number, key: number) {
    const rgb = this.CMYKtoRGB(cyan, magenta, yellow, key)
    return this.RGBtoHSV(rgb.red, rgb.green, rgb.blue)
  }
}
