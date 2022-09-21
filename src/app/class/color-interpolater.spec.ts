import { ColorInterpolater } from './color-interpolater';
import {Color} from "../models/color.model";
import {Shade} from "../models/shade.model";

describe('ColorInterpolater', () => {

  it('should create red color with 10 shades', () => {
    const color = new Color('red', '#ff0000')

    expect(color.shades.length).toBe(10)
  })

  it('should create random color with 10 shades', () => {
    const shades: Shade[] = []
    for (let i = 0; i < 4; i++) {
      shades.push(Shade.generateRandomShade())
    }
    const color = new Color('random', shades)
    ColorInterpolater.regenerateShades(color)

    expect(color.shades.length).toBe(10)
  })

})
