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

  public getShade(index: number): Shade {
    return this.shades.find(s => s.index === index) || this.shades[0]
  }

  public static generateRandomColor(): Color {
    const shade = Shade.generateRandomShade()
    return new Color(
      shade.hex,
      shade.hex
    )
  }

}
