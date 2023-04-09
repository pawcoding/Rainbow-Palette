import { Color } from './color.model'

describe('Color', () => {
  let color: Color

  beforeEach(() => {
    color = new Color('red', '#ff0000')
  }, 100)

  it('should create an instance', () => {
    expect(color).toBeTruthy()
    expect(Color.generateRandomColor).toBeTruthy()
  })
})
