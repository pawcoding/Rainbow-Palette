import { Shade } from './shade.model';

describe('Shade', () => {

  let shade: Shade

  beforeEach(() => {
    shade = new Shade(0, true, 0, 100, 50)
  }, 10)

  it('should create an instance', () => {
    expect(shade).toBeTruthy()
    expect(Shade.generateRandomShade()).toBeTruthy()
  })

  it('should have set values', () => {
    expect(shade.index).toBe(0)
    expect(shade.fixed).toBeTrue()
    expect(shade.hue).toBe(0)
    expect(shade.saturation).toBe(100)
    expect(shade.luminosity).toBe(50)

    shade = new Shade(0, true, '#00ff00')
    expect(shade.hex).toBe('#00FF00')
  })

  it('should set random values', () => {
    shade.setIndex(500)
    expect(shade.index).toBe(500)

    shade.setHSL(120, 100, 37)
    expect(shade.fixed).toBeFalse()
    expect(shade.hue).toBe(120)
    expect(shade.saturation).toBe(100)
    expect(shade.luminosity).toBe(37)

    shade.setHEX('#00bb00', true)
    expect(shade.hex).toBe('#00BB00')
    expect(shade.fixed).toBeTrue()
  })

  it('should parse shade', () => {
    const json = {
      index: 0,
      fixed: true,
      hex: '#ff0000',
      hue: 0,
      saturation: 100,
      luminosity: 50
    }

    expect(Shade.parseShade(json)).toEqual(shade)
  })

})
