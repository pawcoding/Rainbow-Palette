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
    shades.sort((a, b) => b.luminosity - a.luminosity)

    // set new indices
    // ToDo: Adjust generation for optimal keys when using other sizes than 10
    let indices = [...Array(size).keys()].map(index => 20 + index * 80)
    indices[0] = 50
    for (const shade of shades) {
      const index = indices.reduce((prev, curr) =>
        (Math.abs(curr - (100 - shade.brightness) * 10) < Math.abs(prev - (100 - shade.brightness) * 10) ? curr : prev))
      shade.setIndex(index)
      indices = indices.filter(i => i !== index)
    }

    // add white and black to shades
    shades.push(new Shade(0, true,
      (shades[0].hue + 5) % 360,
      Math.min(shades[0].saturation + 10, 100),
      100)
    )
    shades.push(new Shade(1000, true,
      (shades[shades.length-1].hue + 355) % 360,
      Math.max(shades[shades.length-1].saturation - 10, 0),
      0)
    )

    shades.sort((a, b) => a.index - b.index)

    // generate missing shades
    for (const index of indices) {
      const smaller = [...shades].reverse().find(shade => shade.index < index) || shades[0]
      const bigger = shades.find(shade => shade.index > index) || shades[shades.length-1]

      const hue = this.mapNumbers(
        index,
        smaller.index,
        bigger.index,
        bigger.hue - smaller.hue > 180 ? (smaller.hue + 360) : smaller.hue,
        smaller.hue - bigger.hue > 180 ? (bigger.hue + 360) : bigger.hue
      ) % 360

      const saturation = this.mapNumbers(index, smaller.index, bigger.index, smaller.saturation, bigger.saturation)
      const luminosity = this.mapNumbers(index, smaller.index, bigger.index, smaller.luminosity, bigger.luminosity)

      shades.push(new Shade(index, false, hue, saturation, luminosity))
    }

    // remove white and black and set shades to color
    shades = shades.filter(shade => shade.index !== 0 && shade.index !== 1000)

    // repair broken orders
    shades.sort((a, b) => b.luminosity - a.luminosity)
    indices = [...Array(size).keys()].map(index => index * 100)
    indices[0] = 50
    for (let i = 0; i < shades.length; i++) {
      shades[i].setIndex(indices[i])
    }

    color.shades = shades
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
