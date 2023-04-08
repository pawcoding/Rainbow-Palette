import { Palette } from './palette.model'

describe('Palette', () => {
  it('should create an instance', () => {
    expect(new Palette('palette', '0123456789')).toBeTruthy()
  })
})
