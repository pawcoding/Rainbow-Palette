import {Color} from "./color.model";

export class Palette {

  title: string
  id: string
  colors: Color[] = []

  constructor(title: string) {
    this.title = title
    this.id = 'sfhaislfhasbfshgf'
  }

  public addColor(name: string, hex: string) {
    this.colors.push(new Color(name, hex))
  }

  public static generateRandomPalette(size: number): Palette {
    if (size < 1)
      throw `Size was ${size} but must be positive.`

    const palette = new Palette('Random')
    for (let i = 0; i < size; i++) {
      const color = Color.generateRandomColor()
      palette.addColor(color.name, color.getShade(500).hex)
    }

    palette.colors.sort((a, b) => a.getShade(500).hue - b.getShade(500).hue)

    return palette;
  }

}
