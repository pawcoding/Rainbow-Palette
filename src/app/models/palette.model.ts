import {Color} from "./color.model";

export class Palette {

  title: string
  id: string
  colors: Color[] = []

  constructor(title: string) {
    this.title = title
    this.id = 'sfhaislfhasbfshgf'
  }

  public addColor(color: Color) {
    this.colors.unshift(color)
  }

  public removeColor(color: Color) {
    const index = this.colors.indexOf(color)
    if (index > -1)
      this.colors.splice(index, 1)
  }

  public sortColors() {
    this.colors.sort((a, b) => a.getShade(500).hue - b.getShade(500).hue)
  }

  public static generateRandomPalette(size: number): Palette {
    if (size < 1)
      throw `Size was ${size} but must be positive.`

    const palette = new Palette('Random')
    for (let i = 0; i < size; i++) {
      const color = Color.generateRandomColor()
      palette.addColor(new Color(color.name, color.getShade(500).hex))
    }

    palette.colors.sort((a, b) => a.getShade(500).hue - b.getShade(500).hue)

    return palette;
  }

  public toString() {
    return JSON.stringify({
      id: this.id,
      title: this.title,
      colors: this.colors
    })
  }

  public static parsePalette(json: any): Palette {
    if (!json.title)
      throw 'Palette has no title'
    if (!json.colors)
      throw 'Palette has no colors'

    const palette = new Palette(json.title)

    for (const color of json.colors) {
      palette.addColor(Color.parseColor(color))
    }
    palette.colors.reverse()

    return palette
  }

}
