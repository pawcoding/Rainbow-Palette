import { ColorConverter } from './color-converter';

describe('ColorConverter', () => {

  it('should convert hex to hsl', () => {
    const hsl = ColorConverter.HEXtoHSL('#ff0000')
    expect(hsl.hue).toBe(0)
    expect(hsl.saturation).toBe(100)
    expect(hsl.luminosity).toBe(50)
  })

  it('should convert hsl to hex', () => {
    expect(ColorConverter.HSLtoHEX(0, 100, 50))
      .toBe('#FF0000')
  })

  it('should convert hex to rgb', () => {
    const rgb = ColorConverter.HEXtoRGB('#ff784a')
    expect(rgb.red).toBe(255)
    expect(rgb.green).toBe(120)
    expect(rgb.blue).toBe(74)
  })

  it('should convert rgb to hex', () => {
    expect(ColorConverter.RGBtoHEX(231, 56, 135))
      .toBe('#E73887')
  })

  it('should convert rgb to cmyk', () => {
    const cmyk = ColorConverter.RGBtoCMYK(24, 184, 93)
    expect(cmyk.cyan).toBe(87)
    expect(cmyk.magenta).toBe(0)
    expect(cmyk.yellow).toBe(49)
    expect(cmyk.key).toBe(28)

    const rgb = ColorConverter.CMYKtoRGB(87, 0, 49, 28)
    expect(rgb.red).toBe(24)
    expect(rgb.green).toBe(184)
    expect(rgb.blue).toBeCloseTo(93, -1)
  })

})
