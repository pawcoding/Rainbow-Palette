import {ColorConverter} from "../class/color-converter";

export class Shade {

  index: number
  hex: string
  hue: number
  saturation: number
  luminosity: number
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
    } else if (args.length === 5) {
      this.hue = args[2]
      this.saturation = args[3]
      this.luminosity = args[4]
      this.hex = ColorConverter.HSLtoHEX(this.hue, this.saturation, this.luminosity)
    } else {
      this.hex = args[2]
      this.hue = args[3]
      this.saturation = args[4]
      this.luminosity = args[5]
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
  }

  public setHSL(hue: number, saturation: number, luminosity: number, fixed = false) {
    this.fixed = fixed
    this.hue = hue
    this.saturation = saturation
    this.luminosity = luminosity
    this.hex = ColorConverter.HSLtoHEX(this.hue, this.saturation, this.luminosity)
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

    return new Shade(json.index, json.fixed || true, json.hex, json.hue, json.saturation, json.luminosity)
  }

}
