import {ColorConverter} from "../class/color-converter";

export class Shade {

  index: number
  hex: string
  hue: number
  saturation: number
  luminosity: number
  brightness: number = 0
  fixed: boolean

  public constructor(index: number, fixed: boolean, hex: string)
  public constructor(index: number, fixed: boolean, hue: number, saturation: number, luminosity: number)
  public constructor(index: number, fixed: boolean, hex: string, hue: number, saturation: number, luminosity: number)

  constructor(...args: any[]) {
    this.index = args[0]
    this.fixed = args[1]

    if (args.length === 3) {
      this.hex = args[2]
      const hsl = ColorConverter.HEXtoHSL(this.hex)
      this.hue = hsl.hue
      this.saturation = hsl.saturation
      this.luminosity = hsl.luminosity
      this.updateBrightness()
    } else if (args.length === 5) {
      this.hue = args[2]
      this.saturation = args[3]
      this.luminosity = args[4]
      this.updateBrightness()
      this.hex = ColorConverter.HSLtoHEX(this.hue, this.saturation, this.luminosity)
    } else {
      this.hex = args[2]
      this.hue = args[3]
      this.saturation = args[4]
      this.luminosity = args[5]
      this.updateBrightness()
    }
  }

  public setIndex(index: number) {
    this.index = index
  }

  public setHEX(hex: string, fixed = false) {
    this.fixed = fixed
    this.hex = hex
    const hsl = ColorConverter.HEXtoHSL(this.hex)
    this.hue = hsl.hue
    this.saturation = hsl.saturation
    this.luminosity = hsl.luminosity
    this.updateBrightness()
  }

  public setHSL(hue: number, saturation: number, luminosity: number, fixed = false) {
    this.fixed = fixed
    this.hue = hue
    this.saturation = saturation
    this.luminosity = luminosity
    this.updateBrightness()
    this.hex = ColorConverter.HSLtoHEX(this.hue, this.saturation, this.luminosity)
  }

  private updateBrightness() {
    let x = 360 - this.hue

    let adjustment
    if (x < 120)
      adjustment = -0.0007 * x * x + 0.17 * x - 0.3
    else if (x > 260)
      adjustment = 0.001 * x * x - 0.52 * x + 57.6
    else
      adjustment = ((-20) / (1 + Math.pow(243.21, - x / 70) * 2640162)) + 10

    this.brightness = this.luminosity - Math.round(adjustment)
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
  public static parseShade(json: any): Shade {
    if ((!json.index && json.index !== 0)
        || !json.hex
        || (!json.hue && json.hue !== 0)
        || (!json.saturation && json.saturation !== 0)
        || (!json.luminosity && json.luminosity !== 0))
      throw 'Not all parameters for shade are set'

    return new Shade(json.index, json.fixed, json.hex, json.hue, json.saturation, json.luminosity)
  }

}
