import { Injectable } from '@angular/core';
import { ColorTranslator } from 'colortranslator';
import { Color } from '../model/color.model';
import { Shade } from '../model/shade.model';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  public randomColor(): Color {
    const color = new Color([Shade.random()]);

    this.regenerateShades(color);

    return color;
  }

  /**
   * Regenerate every shade but the fixed ones.
   * @param color
   */
  public regenerateShades(color: Color): void {
    // Get all fixed shades sorted by perceived brightness
    const shades = color.shades
      .map((shade) => shade.copy())
      .filter((shade) => shade.fixed)
      .sort((a, b) => b.perceivedBrightness - a.perceivedBrightness);

    // Give each shade an index
    const indices = [...Array(10).keys()].map((i) => i * 100);
    indices[0] = 50;
    this._distributeIndices(shades, indices);

    // Calculate minimal saturation
    const minimum = this._calculateMinSaturation(shades);

    // Create "white"
    const white = this._createBorderShade(shades[0], minimum, true);
    shades.unshift(white);

    // Create "black"
    const black = this._createBorderShade(
      shades[shades.length - 1],
      minimum,
      false
    );
    shades.push(black);

    // Create missing shades
    for (const index of indices) {
      // Shade already exists
      if (shades.some((shade) => shade.index === index)) continue;

      // Find darker, lighter and third point
      const lighter =
        shades
          .slice()
          .reverse()
          .find((shade) => shade.index < index && shade.fixed) || white;
      const darker =
        shades.find((shade) => shade.index > index && shade.fixed) || black;
      let third = shades
        .slice()
        .reverse()
        .find((shade) => shade.index < lighter.index && shade.fixed);
      if (!third)
        third =
          shades.find((shade) => shade.index > darker.index && shade.fixed) ||
          black;

      // Interpolate properties
      const hue =
        this._mapNumbers(
          index,
          lighter.index,
          darker.index,
          darker.hsl.H - lighter.hsl.H > 180
            ? lighter.hsl.H + 360
            : lighter.hsl.H,
          lighter.hsl.H - darker.hsl.H > 180 ? darker.hsl.H + 360 : darker.hsl.H
        ) % 360;
      const luminosity = this._mapNumbers(
        index,
        lighter.index,
        darker.index,
        lighter.hsl.L,
        darker.hsl.L
      );
      const saturation = this._calculateSaturation(
        luminosity,
        lighter,
        darker,
        third
      );

      // Add shade
      const shade = new Shade(
        index,
        new ColorTranslator({ H: hue, S: saturation, L: luminosity }),
        false
      );
      shades.push(shade);
    }

    // Filter "black" and "white" and sort again by index
    color.shades = shades
      .filter((shade) => !(shade.index === 0 || shade.index === 1200))
      .sort((a, b) => a.index - b.index);
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
  private _distributeIndices(shades: Array<Shade>, indices: number[]): void {
    shades.forEach((shade) => {
      const mapBrightness = Math.max(
        Math.min(1250 - 12.5 * shade.perceivedBrightness, 999),
        1
      );
      const index = indices.reduce((prev, curr) =>
        Math.abs(mapBrightness - curr) < Math.abs(mapBrightness - prev)
          ? curr
          : prev
      );
      shade.index = index;
    });

    this._offsetIndicesFromLightest(shades);
  }

  /**
   * Offset indices from lightest to darkest so no index appears multiple times.
   * @param shades
   */
  private _offsetIndicesFromLightest(shades: Shade[]): void {
    let minIndex = 0;
    for (let i = 0; i < shades.length; i++) {
      const shade = shades[i];

      if (minIndex >= shade.index) {
        if (minIndex < 900) {
          shade.index = minIndex + 100 - (minIndex % 100);
        } else {
          shade.index = 900;
          this._offsetIndicesFromDarkest(shades, i);
        }
      }

      minIndex = shade.index;
    }
  }

  /**
   * Offset indices from darkest to lightest so the index of `shades[start]` is the biggest and no index appears multiple times.
   * @param shades
   * @param start
   */
  private _offsetIndicesFromDarkest(shades: Shade[], start: number): void {
    let maxIndex = shades[start].index;
    for (let j = start - 1; j >= 0; j--) {
      const brighter = shades[j];

      if (maxIndex > brighter.index) return;

      brighter.index = maxIndex -= 100;
    }
  }

  /**
   * Calculate the lowest saturation using the current lowest offset with an adjusted one.
   *
   * Returns an object including the calculated saturation alongside the brightness of the shade with the lowest saturation.
   * @param shades
   */
  private _calculateMinSaturation(shades: Shade[]): {
    saturation: number;
    brightness: number;
  } {
    const shadeWithLowestSaturation = shades.reduce((prev, curr) =>
      curr.hsl.S < prev.hsl.S ? curr : prev
    );
    const differenceFromMiddleSquared = Math.pow(
      50 - shadeWithLowestSaturation.perceivedBrightness,
      2
    );
    const evenLowerSaturation = Math.max(
      shadeWithLowestSaturation.hsl.S - 0.01 * differenceFromMiddleSquared,
      0
    );
    return {
      saturation: Math.round(
        (shadeWithLowestSaturation.hsl.S + evenLowerSaturation) / 2
      ),
      brightness: shadeWithLowestSaturation.perceivedBrightness,
    };
  }

  /**
   * Creates the most extreme shades ("black" and "white").
   * This is done with respect to the hue of the current lightest and darkest shades alongside the minimal saturation and brightness of the current color.
   * @param shade
   * @param minimum
   * @param white
   * @private
   */
  private _createBorderShade(
    shade: Shade,
    minimum: { saturation: number; brightness: number },
    white: boolean
  ) {
    const index = white ? 0 : 1000;
    const hue = this._calculateHue(shade, white);
    const saturation = this._calculateMaxSaturation(minimum, shade, index);
    const luminosity = (1000 - index) / 10;

    return new Shade(
      white ? 0 : 1200,
      new ColorTranslator({ H: hue, S: saturation, L: luminosity }),
      true
    );
  }

  /**
   * Calculate the hue of the lightest and darkest shades with the hue of the nearest neighbor in mind.
   * If we want to create a lighter shade, we rotate in direction 60, 180 and 300 degree respectively.
   * If we want to create a darker shade, we rotate in direction 0, 120 and 240 degree respectively.
   * @param shade
   * @param white
   */
  private _calculateHue(shade: Shade, white: boolean) {
    const hueAdjustmentDirection =
      shade.hsl.H < 60 ||
      (120 < shade.hsl.H && shade.hsl.H < 180) ||
      (240 < shade.hsl.H && shade.hsl.H < 300)
        ? 1
        : -1;

    let hue =
      shade.hsl.H +
      (hueAdjustmentDirection *
        (white ? 1 : -1) *
        (white ? shade.index : 1000 - shade.index)) /
        60;

    if (white) {
      if ((shade.hsl.H <= 60 && hue > 60) || (shade.hsl.H >= 60 && hue < 60)) {
        hue = 60;
      } else if (
        (shade.hsl.H <= 180 && hue > 180) ||
        (shade.hsl.H >= 180 && hue < 180)
      ) {
        hue = 180;
      } else if (
        (shade.hsl.H <= 300 && hue > 300) ||
        (shade.hsl.H >= 300 && hue < 300)
      ) {
        hue = 300;
      }
    } else {
      if (
        (((shade.hsl.H > 340 && shade.hsl.H < 360) || shade.hsl.H === 0) &&
          hue > 0 &&
          hue < 20) ||
        (shade.hsl.H >= 0 && shade.hsl.H < 20 && hue < 0)
      ) {
        hue = 0;
      } else if (
        (shade.hsl.H <= 120 && hue > 120) ||
        (shade.hsl.H >= 120 && hue < 120)
      ) {
        hue = 120;
      } else if (
        (shade.hsl.H <= 240 && hue > 240) ||
        (shade.hsl.H >= 240 && hue < 240)
      ) {
        hue = 240;
      }
    }

    return Math.round(360 + hue) % 360;
  }

  /**
   * Calculate the highest saturation based on a neighbor with minimal saturation and the nearest neighbor.
   * @param minimum
   * @param neighbor
   * @param index
   */
  private _calculateMaxSaturation(
    minimum: { saturation: number; brightness: number },
    neighbor: Shade,
    index: number
  ) {
    if (neighbor.perceivedBrightness === minimum.brightness)
      return Math.round(
        -0.01 * Math.pow(minimum.saturation, 2) + 2 * minimum.saturation
      );

    const a =
      (neighbor.hsl.S - minimum.saturation) /
      Math.pow(neighbor.perceivedBrightness - minimum.brightness, 2);
    const maxSaturation =
      a * Math.pow(index / 10 - minimum.brightness, 2) + minimum.saturation;

    const minAdd = -0.01 * Math.pow(neighbor.hsl.S, 2) + 2 * neighbor.hsl.S;

    return Math.min(Math.round(Math.max(maxSaturation, minAdd, 0)), 100);
  }

  /**
   * Map numbers on a linear 1 dimensional scale
   * @param x
   * @param in_min
   * @param in_max
   * @param out_min
   * @param out_max
   */
  private _mapNumbers(
    x: number,
    in_min: number,
    in_max: number,
    out_min: number,
    out_max: number
  ): number {
    return Math.round(
      ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  }

  /**
   * Calculate the saturation by interpolating a value for the current luminosity on a quadratic 2 dimensional parable defined by three points (shades).
   * @param luminosity
   * @param left
   * @param middle
   * @param right
   */
  private _calculateSaturation(
    luminosity: number,
    left: Shade,
    middle: Shade,
    right: Shade
  ) {
    const ll2 = left.hsl.L * left.hsl.L;
    const ml2 = middle.hsl.L * middle.hsl.L;
    const rl2 = right.hsl.L * right.hsl.L;

    const delta =
      ll2 * middle.hsl.L +
        left.hsl.L * rl2 +
        ml2 * right.hsl.L -
        middle.hsl.L * rl2 -
        ll2 * right.hsl.L -
        left.hsl.L * ml2 || 0.01;
    const aNumerator =
      left.hsl.S * middle.hsl.L +
      left.hsl.L * right.hsl.S +
      middle.hsl.S * right.hsl.L -
      middle.hsl.L * right.hsl.S -
      left.hsl.S * right.hsl.L -
      left.hsl.L * middle.hsl.S;
    const bNumerator =
      ll2 * middle.hsl.S +
      left.hsl.S * rl2 +
      ml2 * right.hsl.S -
      middle.hsl.S * rl2 -
      ll2 * right.hsl.S -
      left.hsl.S * ml2;
    const cNumerator =
      ll2 * middle.hsl.L * right.hsl.S +
      left.hsl.L * middle.hsl.S * rl2 +
      left.hsl.S * ml2 * right.hsl.L -
      left.hsl.S * middle.hsl.L * rl2 -
      ll2 * middle.hsl.S * right.hsl.L -
      left.hsl.L * ml2 * right.hsl.S;

    const x = aNumerator / delta;
    const y = bNumerator / delta;
    const z = cNumerator / delta;

    const saturation = x * luminosity * luminosity + y * luminosity + z;
    return Math.max(Math.min(Math.round(saturation), 100), 0);
  }
}
