import {ColorInterpolater} from "../class/color-interpolater";
import {Shade} from "./shade.model";

export class Color {

  name: string

  shades: Shade[]

  public constructor(name: string, hex: string)
  public constructor(name: string, hexes: string[])
  public constructor(name: string, shades: Shade[])

  constructor(...args: any[]) {
    this.name = args[0].startsWith('#') ? args[0].substring(1) : args[0]

    if (typeof args[1] === 'string') {
      this.shades = []
      const shade = new Shade(-1, true, args[1])
      this.shades.push(shade)
      ColorInterpolater.regenerateShades(this)

      shade.fixed = false
      this.getShade(500).fixed = true
    } else if (typeof args[1][0] === 'string') {
      this.shades = []

      for (const hex of args[1]) {
        this.shades.push(new Shade(-1, true, hex))
      }
      ColorInterpolater.regenerateShades(this)

      this.getShade(500).fixed = true
    } else {
      this.shades = args[1]
      ColorInterpolater.regenerateShades(this)
      this.getShade(500).fixed = true
    }

    this.shades.sort((a, b) => a.index - b.index)
  }

  /**
   * Get shade by index (50, 100, 200, ..., 900)
   * @param index
   */
  public getShade(index: number): Shade {
    return this.shades.find(s => s.index === index) || this.shades[0]
  }

  /**
   * Generate a random color with all shades.
   */
  public static generateRandomColor(): Color {
    const shade = Shade.generateRandomShade()
    return new Color(
      shade.hex,
      shade.hex
    )
  }

  /**
   * Stringify the color.
   */
  public toString() {
    return JSON.stringify({
      name: this.name,
      shades: this.shades
    })
  }

  /**
   * Parse the json object to a color.
   * Throws exception if json object is no valid color object.
   * @param json
   */
  public static parseColor(json: any): Color {
    if (!json.name)
      throw 'Color has no name'
    if (!json.shades || json.shades.length < 1)
      throw 'Color has not enough shades'

    const shades: Shade[] = []
    for (const shade of json.shades) {
      shades.push(Shade.parseShade(shade))
    }

    return new Color(json.name, shades)
  }

}
