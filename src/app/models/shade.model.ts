import { ColorConverter } from '../class/color-converter'

export class Shade {
  index: number
  hex: string
  hue: number
  saturation: number
  luminosity: number
  brightness = 0
  fixed: boolean

  public constructor(index: number, fixed: boolean, hex: string)
  public constructor(
    index: number,
    fixed: boolean,
    hue: number,
    saturation: number,
    luminosity: number
  )
  public constructor(
    index: number,
    fixed: boolean,
    hex: string,
    hue: number,
    saturation: number,
    luminosity: number
  )

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  constructor(...args: any[]) {
    this.index = args[0]
    this.fixed = args[1]

    if (args.length === 3) {
      if (!args[2].match(/^#[0-9A-Fa-f]{6}$/))
        throw `Color ${args[2]} is not in form #RRGGBB.`

      this.hex = args[2].toUpperCase()
      const hsl = ColorConverter.HEXtoHSL(this.hex)
      this.hue = hsl.hue
      this.saturation = hsl.saturation
      this.luminosity = hsl.luminosity
      this.updateBrightness()
    } else if (args.length === 5) {
      this.hue = args[2]
      this.saturation = args[3]
      this.luminosity = args[4]
      this.hex = ColorConverter.HSLtoHEX(
        this.hue,
        this.saturation,
        this.luminosity
      )
      this.updateBrightness()
    } else {
      if (!args[2].match(/^#[0-9A-Fa-f]{6}$/))
        throw `Color ${args[2]} is not in form #RRGGBB.`

      this.hex = args[2].toUpperCase()
      this.hue = args[3]
      this.saturation = args[4]
      this.luminosity = args[5]
      this.updateBrightness()
    }
  }

  /**
   * Set the shades index
   * @param index
   */
  public setIndex(index: number) {
    this.index = index
  }

  /**
   * Set the shades HEX value and update all other properties
   * @param hex
   * @param fixed
   */
  public setHEX(hex: string, fixed = false) {
    if (!hex.match(/^#[0-9A-Fa-f]{6}$/))
      throw `Color ${hex} is not in form #RRGGBB.`

    this.fixed = fixed
    this.hex = hex.toUpperCase()
    const hsl = ColorConverter.HEXtoHSL(this.hex)
    this.hue = hsl.hue
    this.saturation = hsl.saturation
    this.luminosity = hsl.luminosity
    this.updateBrightness()
  }

  /**
   * Set the shades HSL values and update all other properties
   * @param hue
   * @param saturation
   * @param luminosity
   * @param fixed
   */
  public setHSL(
    hue: number,
    saturation: number,
    luminosity: number,
    fixed = false
  ) {
    this.fixed = fixed
    this.hue = hue
    this.saturation = saturation
    this.luminosity = luminosity
    this.hex = ColorConverter.HSLtoHEX(
      this.hue,
      this.saturation,
      this.luminosity
    )
    this.updateBrightness()
  }

  /**
   * Update perceived brightness
   * @private
   */
  private updateBrightness() {
    const rgb = ColorConverter.HEXtoRGB(this.hex)
    this.brightness = Math.round(
      Math.sqrt(
        0.299 * rgb.red * rgb.red +
          0.587 * rgb.green * rgb.green +
          0.114 * rgb.blue * rgb.blue
      ) / 2.55
    )
  }

  /**
   * Generate a random shade.
   */
  public static generateRandomShade(): Shade {
    return new Shade(
      0,
      true,
      Math.floor(Math.random() * 360),
      30 + Math.floor(Math.random() * 60),
      25 + Math.floor(Math.random() * 50)
    )
  }

  /**
   * Parse the json object to a shade.
   * Throws exception if json object is no valid shade object.
   * @param json
   */
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  public static parseShade(json: any): Shade {
    if (
      (!json.index && json.index !== 0) ||
      !json.hex ||
      (!json.hue && json.hue !== 0) ||
      (!json.saturation && json.saturation !== 0) ||
      (!json.luminosity && json.luminosity !== 0)
    )
      throw 'Not all parameters for shade are set'

    return new Shade(
      json.index,
      json.fixed,
      json.hex.toUpperCase(),
      json.hue,
      json.saturation,
      json.luminosity
    )
  }
}
