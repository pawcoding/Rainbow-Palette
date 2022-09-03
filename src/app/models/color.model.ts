import {ColorInterpolater} from "../class/color-interpolater";
import {Shade} from "./shade.model";

export class Color {

  name: string

  shades: Shade[]

  constructor(
    name: string,
    hex: string
  ) {
    if (!hex.startsWith('#') || hex.length !== 7)
      throw `Color '${hex}' is not in form #RRGGBB.`

    this.name = name
    this.shades = ColorInterpolater.interpolateShades(hex)

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
    if (!json.shades || json.shades.length < 6)
      throw 'Color has not enough shades'

    return new Color(json.name, json.shades[5].hex)
  }

}
