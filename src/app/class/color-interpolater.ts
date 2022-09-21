import {Shade} from "../models/shade.model";
import {Color} from "../models/color.model";

export class ColorInterpolater {

  /**
   * Regenerate every shade but the fixed ones
   * @param color
   */
  public static regenerateShades(color: Color) {
    const size = 10
    let shades = [...color.shades]

    // clear and sort shades
    shades = shades.filter(shade => shade.fixed)
    shades.sort((a, b) => a.luminosity - b.luminosity)

    // set new indices
    // ToDo: Adjust generation for optimal keys when using other sizes than 10
    let indices = [...Array(size).keys()].map(index => index * 100)
    indices[0] = 50
    for (const shade of shades) {
      const index = indices.reduce((prev, curr) =>
        (Math.abs(curr - (100 - shade.luminosity) * 10) < Math.abs(prev - (100 - shade.luminosity) * 10) ? curr : prev))
      shade.setIndex(index)
      indices = indices.filter(i => i !== index)
    }

    // add white and black to shades
    shades.push(new Shade(0, true, shades[0].hue, shades[0].saturation, 100))
    shades.push(new Shade(1000, true, shades[shades.length-1].hue, shades[shades.length-1].saturation, 0))
    shades.sort((a, b) => a.index - b.index)

    // generate missing shades
    for (const index of indices) {
      const smaller = [...shades].reverse().find(shade => shade.index < index) || shades[0]
      const bigger = shades.find(shade => shade.index > index) || shades[shades.length-1]

      const hue = this.mapNumbers(index, smaller.index, bigger.index, smaller.hue, bigger.hue)
      const saturation = this.mapNumbers(index, smaller.index, bigger.index, smaller.saturation, bigger.saturation)
      const luminosity = this.mapNumbers(index, smaller.index, bigger.index, smaller.luminosity, bigger.luminosity)

      shades.push(new Shade(index, false, hue, saturation, luminosity))

      shades.sort((a, b) => a.index - b.index)
    }

    // remove white and black and set shades to color
    color.shades = shades.filter(shade => shade.index !== 0 && shade.index !== 1000)
    color.shades.sort((a, b) => a.index - b.index)
  }

  /**
   * Translate x in [in_min to in_max] to y in [out_min to out_max]
   * @param x
   * @param in_min
   * @param in_max
   * @param out_min
   * @param out_max
   * @private
   */
  private static mapNumbers(x: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
    return Math.round((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min)
  }

}
