import {Shade} from "../models/shade.model";
import {Palette} from "../models/palette.model";
import {Color} from "../models/color.model";

export class PaletteGenerator {

  static generatePalette(hex: string, scheme: PaletteScheme): Palette {
    const shade = new Shade(-1, true, hex)

    const values = Object.values(PaletteScheme)
    const value = values.indexOf(scheme) % (values.length / 2)

    switch (value) {
      case PaletteScheme.MONOCHROMATIC:
        return this.generateMonochromaticPalette(shade)
      case PaletteScheme.ANALOGOUS:
        return this.generateAnalogousPalette(shade)
      case PaletteScheme.COMPLEMENTARY:
        return this.generateComplementaryPalette(shade)
      case PaletteScheme.SPLIT:
        return this.generateSplitPalette(shade)
      case PaletteScheme.TRIADIC:
        return this.generateTriadicPalette(shade)
      case PaletteScheme.COMPOUND:
        return this.generateCompoundPalette(shade)
      default:
        const schemes = Object.keys(PaletteScheme)
        const index = schemes[Math.floor(Math.random() * schemes.length)]
        // @ts-ignore
        return this.generatePalette(hex, PaletteScheme[index])
    }
  }

  private static generateMonochromaticPalette(shade: Shade) {
    const monochromatic = new Palette('Monochrom')

    monochromatic.addColor(new Color('primary', [shade]))
    monochromatic.addColor(new Color('muted', [
      new Shade(-1, true, shade.hue, 30, 50)
    ]), false)
    monochromatic.addColor(new Color('gray', [
      new Shade(-1, true, shade.hue, 2, 50)
    ]), false)

    return monochromatic
  }

  private static generateAnalogousPalette(shade: Shade) {
    const analogous = new Palette('Analogous')

    analogous.addColor(new Color('primary', [shade]))

    analogous.addColor(new Color('secondary', [
      new Shade(-1, true, this.changeHueOnWheel(shade.hue, 315), Math.max(shade.saturation - 20, 0), 40)
    ]), false)
    analogous.addColor(new Color('secondary muted', [
      new Shade(-1, true, this.changeHueOnWheel(shade.hue, 270), 25, 20)
    ]), false)

    analogous.addColor(new Color('accent', [
      new Shade(-1, true, this.changeHueOnWheel(shade.hue, 45), shade.saturation, 50)
    ]), false)
    analogous.addColor(new Color('accent muted', [
      new Shade(-1, true, this.changeHueOnWheel(shade.hue, 90) % 360, 25, 20)
    ]), false)

    return analogous
  }

  private static generateComplementaryPalette(shade: Shade) {
    const complementary = new Palette('Complementary')

    complementary.addColor(new Color('primary', [shade]))

    complementary.addColor(new Color('gray', [
      new Shade(-1, true, shade.hue, 3, 50)
    ]), false)

    complementary.addColor(new Color('secondary', [
      new Shade(-1, true, this.changeHueOnWheel(shade.hue, 180), Math.max(shade.saturation - 20, 0), 40)
    ]), false)

    return complementary
  }

  private static generateSplitPalette(shade: Shade) {
    const split = new Palette('Split')

    split.addColor(new Color('primary', [shade]))

    split.addColor(new Color('secondary', [
      new Shade(-1, true, this.changeHueOnWheel(shade.hue, 20), Math.max(shade.saturation - 20, 0), 40)
    ]), false)
    split.addColor(new Color('gray', [
      new Shade(-1, true, this.changeHueOnWheel(shade.hue, 20), 3, 50)
    ]), false)

    split.addColor(new Color('accent', [
      new Shade(-1, true, this.changeHueOnWheel(shade.hue, 180), shade.saturation, 80)
    ]), false)

    return split
  }

  private static generateTriadicPalette(shade: Shade) {
    const triadic = new Palette('Triadic')

    triadic.addColor(new Color('primary', [shade]))

    triadic.addColor(new Color('primary muted', [
      new Shade(-1, true, shade.hue, 20, 30)
    ]), false)

    triadic.addColor(new Color('secondary', [
      new Shade(-1, true, this.changeHueOnWheel(shade.hue, 120), Math.max(shade.saturation - 20, 0), 40)
    ]), false)
    triadic.addColor(new Color('secondary muted', [
      new Shade(-1, true, this.changeHueOnWheel(shade.hue, 120), 20, 30)
    ]), false)

    triadic.addColor(new Color('accent', [
      new Shade(-1, true, this.changeHueOnWheel(shade.hue, 240), shade.saturation, 20)
    ]), false)

    return triadic
  }

  private static generateCompoundPalette(shade: Shade) {
    const compound = new Palette('Compound')

    compound.addColor(new Color('primary', [shade]))

    compound.addColor(new Color('secondary', [
      new Shade(-1, true, this.changeHueOnWheel(shade.hue, 210), Math.max(shade.saturation - 20, 0), 40)
    ]), false)

    compound.addColor(new Color('accent', [
      new Shade(-1, true, this.changeHueOnWheel(shade.hue, 150), shade.saturation, 50)
    ]), false)

    return compound
  }

  private static changeHueOnWheel(hue: number, change: number) {
    let wheel
    if (hue < 60)
      wheel = 2 * hue
    else if (hue < 120)
      wheel = hue + 60
    else if (hue < 240)
      wheel = .5 * hue + 120
    else
      wheel = hue

    wheel += change
    wheel %= 360

    let newHue
    if (wheel < 120)
      newHue = .5 * wheel
    else if (wheel < 180)
      newHue = wheel + 300
    else if (wheel < 240)
      newHue = 2 * wheel + 120
    else
      newHue = wheel

    return newHue % 360
  }

}

export enum PaletteScheme {
  SURPRISE_ME,
  MONOCHROMATIC,
  ANALOGOUS,
  COMPLEMENTARY,
  SPLIT,
  TRIADIC,
  COMPOUND,
}
