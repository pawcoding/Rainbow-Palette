import { Shade } from '../models/shade.model'
import { Color } from '../models/color.model'

export class ColorInterpolater {
  /**
   * Regenerate every shade but the fixed ones.
   * @param color
   */
  public static regenerateShades(color: Color) {
    // Get all fixed shades sorted by perceived brightness
    const shades = [...color.shades]
      .filter((shade) => shade.fixed)
      .sort((a, b) => b.brightness - a.brightness)

    // Give each shade an index
    const indices = [...Array(10).keys()].map((i) => i * 100)
    indices[0] = 50
    this.distributeIndices(shades, indices)

    // Calculate minimal saturation
    const minimum = this.calculateMinSaturation(shades)

    // Create "white"
    const white = this.createBorderShade(shades[0], minimum, true)
    shades.unshift(white)

    // Create "black"
    const black = this.createBorderShade(
      shades[shades.length - 1],
      minimum,
      false
    )
    shades.push(black)

    // Create missing shades
    for (const index of indices) {
      // Shade already exists
      if (shades.some((shade) => shade.index === index)) continue

      // Find darker, lighter and third point
      const lighter =
        shades.findLast((shade) => shade.index < index && shade.fixed) || white
      const darker =
        shades.find((shade) => shade.index > index && shade.fixed) || black
      let third = shades.findLast(
        (shade) => shade.index < lighter.index && shade.fixed
      )
      if (!third)
        third =
          shades.find((shade) => shade.index > darker.index && shade.fixed) ||
          black

      // Interpolate properties
      const hue =
        this.mapNumbers(
          index,
          lighter.index,
          darker.index,
          darker.hue - lighter.hue > 180 ? lighter.hue + 360 : lighter.hue,
          lighter.hue - darker.hue > 180 ? darker.hue + 360 : darker.hue
        ) % 360
      const luminosity = this.mapNumbers(
        index,
        lighter.index,
        darker.index,
        lighter.luminosity,
        darker.luminosity
      )
      const saturation = this.calculateSaturation(
        luminosity,
        lighter,
        darker,
        third
      )

      // Add shade
      const shade = new Shade(index, false, hue, saturation, luminosity)
      shades.push(shade)
    }

    // Filter "black" and "white" and sort again by index
    color.shades = shades
      .filter((shade) => !(shade.index === 0 || shade.index === 1200))
      .sort((a, b) => a.index - b.index)
  }

  /**
   * Distribute fixed indices from `[50, 100, 200, ..., 900]` to all shades by perceived brightness.
   * Every index will only appear once.
   * This is done by shifting a duplicate index to the next one.
   *
   * **Help wanted:** This algorithm could be improved by calculating penalty points for shifting, generating multiple variants and choosing the one with the fewest penalty points.
   * @param shades
   * @param indices
   */
  private static distributeIndices(shades: Shade[], indices: number[]) {
    shades.forEach((shade) => {
      const mapBrightness = Math.max(
        Math.min(1250 - 12.5 * shade.brightness, 999),
        1
      )
      const index = indices.reduce((prev, curr) =>
        Math.abs(mapBrightness - curr) < Math.abs(mapBrightness - prev)
          ? curr
          : prev
      )
      shade.setIndex(index)
    })

    this.offsetIndicesFromLightest(shades)
  }

  /**
   * Offset indices from lightest to darkest so no index appears multiple times.
   * @param shades
   */
  private static offsetIndicesFromLightest(shades: Shade[]) {
    let minIndex = 0
    for (let i = 0; i < shades.length; i++) {
      const shade = shades[i]

      if (minIndex >= shade.index) {
        if (minIndex < 900) {
          shade.setIndex(minIndex + 100 - (minIndex % 100))
        } else {
          shade.setIndex(900)
          this.offsetIndicesFromDarkest(shades, i)
        }
      }

      minIndex = shade.index
    }
  }

  /**
   * Offset indices from darkest to lightest so the index of `shades[start]` is the biggest and no index appears multiple times.
   * @param shades
   * @param start
   */
  private static offsetIndicesFromDarkest(shades: Shade[], start: number) {
    let maxIndex = shades[start].index
    for (let j = start - 1; j >= 0; j--) {
      const brighter = shades[j]

      if (maxIndex > brighter.index) return

      brighter.setIndex((maxIndex -= 100))
    }
  }

  /**
   * Calculate the lowest saturation using the current lowest offset with an adjusted one.
   *
   * Returns an object including the calculated saturation alongside the brightness of the shade with the lowest saturation.
   * @param shades
   */
  private static calculateMinSaturation(shades: Shade[]) {
    const shadeWithLowestSaturation = shades.reduce((prev, curr) =>
      curr.saturation < prev.saturation ? curr : prev
    )
    const differenceFromMiddleSquared = Math.pow(
      50 - shadeWithLowestSaturation.brightness,
      2
    )
    const evenLowerSaturation = Math.max(
      shadeWithLowestSaturation.saturation - 0.01 * differenceFromMiddleSquared,
      0
    )
    return {
      saturation: Math.round(
        (shadeWithLowestSaturation.saturation + evenLowerSaturation) / 2
      ),
      brightness: shadeWithLowestSaturation.brightness,
    }
  }

  /**
   * Creates the most extreme shades ("black" and "white").
   * This is done with respect to the hue of the current lightest and darkest shades alongside the minimal saturation and brightness of the current color.
   * @param shade
   * @param minimum
   * @param white
   * @private
   */
  private static createBorderShade(
    shade: Shade,
    minimum: { saturation: number; brightness: number },
    white: boolean
  ) {
    const index = white ? 0 : 1000
    const hue = this.calculateHue(shade, white)
    const saturation = this.calculateMaxSaturation(minimum, shade, index)
    const luminosity = (1000 - index) / 10

    return new Shade(white ? 0 : 1200, true, hue, saturation, luminosity)
  }

  /**
   * Calculate the hue of the lightest and darkest shades with the hue of the nearest neighbor in mind.
   * If we want to create a lighter shade, we rotate in direction 60, 180 and 300 degree respectively.
   * If we want to create a darker shade, we rotate in direction 0, 120 and 240 degree respectively.
   * @param shade
   * @param white
   */
  private static calculateHue(shade: Shade, white: boolean) {
    const hueAdjustmentDirection =
      shade.hue < 60 ||
      (120 < shade.hue && shade.hue < 180) ||
      (240 < shade.hue && shade.hue < 300)
        ? 1
        : -1

    let hue =
      shade.hue +
      (hueAdjustmentDirection *
        (white ? 1 : -1) *
        (white ? shade.index : 1000 - shade.index)) /
        60

    if (white) {
      if ((shade.hue <= 60 && hue > 60) || (shade.hue >= 60 && hue < 60)) {
        hue = 60
      } else if (
        (shade.hue <= 180 && hue > 180) ||
        (shade.hue >= 180 && hue < 180)
      ) {
        hue = 180
      } else if (
        (shade.hue <= 300 && hue > 300) ||
        (shade.hue >= 300 && hue < 300)
      ) {
        hue = 300
      }
    } else {
      if (
        (((shade.hue > 340 && shade.hue < 360) || shade.hue === 0) &&
          hue > 0 &&
          hue < 20) ||
        (shade.hue >= 0 && shade.hue < 20 && hue < 0)
      ) {
        hue = 0
      } else if (
        (shade.hue <= 120 && hue > 120) ||
        (shade.hue >= 120 && hue < 120)
      ) {
        hue = 120
      } else if (
        (shade.hue <= 240 && hue > 240) ||
        (shade.hue >= 240 && hue < 240)
      ) {
        hue = 240
      }
    }

    return Math.round(360 + hue) % 360
  }

  /**
   * Calculate the highest saturation based on a neighbor with minimal saturation and the nearest neighbor.
   * @param minimum
   * @param neighbor
   * @param index
   */
  private static calculateMaxSaturation(
    minimum: { saturation: number; brightness: number },
    neighbor: Shade,
    index: number
  ) {
    if (neighbor.brightness === minimum.brightness)
      return Math.round(
        -0.01 * Math.pow(minimum.saturation, 2) + 2 * minimum.saturation
      )

    const a =
      (neighbor.saturation - minimum.saturation) /
      Math.pow(neighbor.brightness - minimum.brightness, 2)
    const maxSaturation =
      a * Math.pow(index / 10 - minimum.brightness, 2) + minimum.saturation

    const minAdd =
      -0.01 * Math.pow(neighbor.saturation, 2) + 2 * neighbor.saturation

    return Math.min(Math.round(Math.max(maxSaturation, minAdd, 0)), 100)
  }

  /**
   * Map numbers on a linear 1 dimensional scale
   * @param x
   * @param in_min
   * @param in_max
   * @param out_min
   * @param out_max
   */
  private static mapNumbers(
    x: number,
    in_min: number,
    in_max: number,
    out_min: number,
    out_max: number
  ): number {
    return Math.round(
      ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    )
  }

  /**
   * Calculate the saturation by interpolating a value for the current luminosity on a quadratic 2 dimensional parable defined by three points (shades).
   * @param luminosity
   * @param left
   * @param middle
   * @param right
   */
  private static calculateSaturation(
    luminosity: number,
    left: Shade,
    middle: Shade,
    right: Shade
  ) {
    const ll2 = left.luminosity * left.luminosity
    const ml2 = middle.luminosity * middle.luminosity
    const rl2 = right.luminosity * right.luminosity

    const delta =
      ll2 * middle.luminosity +
        left.luminosity * rl2 +
        ml2 * right.luminosity -
        middle.luminosity * rl2 -
        ll2 * right.luminosity -
        left.luminosity * ml2 || 0.01
    const aNumerator =
      left.saturation * middle.luminosity +
      left.luminosity * right.saturation +
      middle.saturation * right.luminosity -
      middle.luminosity * right.saturation -
      left.saturation * right.luminosity -
      left.luminosity * middle.saturation
    const bNumerator =
      ll2 * middle.saturation +
      left.saturation * rl2 +
      ml2 * right.saturation -
      middle.saturation * rl2 -
      ll2 * right.saturation -
      left.saturation * ml2
    const cNumerator =
      ll2 * middle.luminosity * right.saturation +
      left.luminosity * middle.saturation * rl2 +
      left.saturation * ml2 * right.luminosity -
      left.saturation * middle.luminosity * rl2 -
      ll2 * middle.saturation * right.luminosity -
      left.luminosity * ml2 * right.saturation

    const x = aNumerator / delta
    const y = bNumerator / delta
    const z = cNumerator / delta

    const saturation = x * luminosity * luminosity + y * luminosity + z
    return Math.max(Math.min(Math.round(saturation), 100), 0)
  }
}
