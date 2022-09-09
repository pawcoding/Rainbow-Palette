import {Color} from "./color.model";
// @ts-ignore
import {v4 as uuidv4} from "uuid";

export class Palette {

  title: string
  id: string
  colors: Color[] = []
  order = false

  constructor(title: string, id: string) {
    this.title = title
    this.id = id
  }

  /**
   * Add a color to the beginning of the palette.
   * @param color
   */
  public addColor(color: Color) {
    if (this.colors.find(c => c.name === color.name))
      this.colors[this.colors.findIndex(c => c.name === color.name)] = color
    else
      this.colors.unshift(color)

    this.order = false
  }

  /**
   * Remove the color from the palette
   * @param color
   */
  public removeColor(color: Color) {
    const index = this.colors.indexOf(color)
    if (index > -1) {
      this.colors.splice(index, 1)
      return true
    } else {
      return false
    }
  }

  /**
   * Sort all colors of the palette by hue
   */
  public sortColors() {
    this.colors.sort((a, b) => {
      if (this.order)
        return a.getShade(500).hue - b.getShade(500).hue
      else
        return b.getShade(500).hue - a.getShade(500).hue
    })
    this.order = !this.order
  }

  /**
   * Generate a new random palette with 'size' colors.
   * @param size
   */
  public static generateRandomPalette(size: number): Palette {
    if (size < 1)
      throw `Size was ${size} but must be positive.`

    const palette = new Palette('Random', uuidv4())
    for (let i = 0; i < size; i++) {
      const color = Color.generateRandomColor()
      palette.addColor(new Color(color.name, color.getShade(500).hex))
    }

    palette.colors.sort((a, b) => a.getShade(500).hue - b.getShade(500).hue)

    return palette;
  }

  /**
   * Stringify the palette.
   */
  public toString() {
    return JSON.stringify({
      id: this.id,
      title: this.title,
      colors: this.colors
    })
  }

  /**
   * Parse the json object to a palette.
   * Throws exception if not all values are given.
   * @param json
   */
  public static parsePalette(json: any): Palette {
    if (!json.title)
      throw 'Palette has no title'
    if (!json.id)
      throw 'Palette has no id'
    if (!json.colors)
      throw 'Palette has no colors'

    const palette = new Palette(json.title, json.id)

    for (const color of json.colors) {
      palette.addColor(Color.parseColor(color))
    }
    palette.colors.reverse()

    return palette
  }

}
