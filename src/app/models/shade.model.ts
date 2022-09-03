import {ColorConverter} from "../class/color-converter";

export class Shade {

  index: number
  hex: string
  hue: number
  saturation: number
  luminosity: number

  public constructor(index: number, hex: string);
  public constructor(index: number, hue: number, saturation: number, luminosity: number);
  public constructor(index: number, hex: string, hue: number, saturation: number, luminosity: number);

  constructor(...args: any[]) {
    this.index = args[0]

    if (args.length === 2) {
      this.hex = args[1]
      const hsl = ColorConverter.HEXtoHSL(this.hex)
      this.hue = hsl.hue
      this.saturation = hsl.saturation
      this.luminosity = hsl.luminosity
    } else if (args.length === 4) {
      this.hex = ColorConverter.HSLtoHEX(args[1], args[2], args[3])
      this.hue = args[1]
      this.saturation = args[2]
      this.luminosity = args[3]
    } else {
      this.hex = args[1]
      this.hue = args[2]
      this.saturation = args[3]
      this.luminosity = args[4]
    }
  }

  /**
   * Generate a random shade.
   */
  public static generateRandomShade(): Shade {
    return new Shade(
      0,
      Math.floor(Math.random() * 360),
      Math.floor(Math.random() * 100),
      25 + Math.floor(Math.random() * 50)
    )
  }

}
