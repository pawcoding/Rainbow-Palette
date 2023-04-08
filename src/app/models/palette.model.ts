import { Color } from './color.model'
import { v4 as uuidv4 } from 'uuid'

export class Palette {
  title: string
  id: string
  colors: Color[] = []
  order = false

  constructor(title: string, id?: string) {
    this.title = title
    this.id = id || uuidv4()
  }

  /**
   * Add a color to the beginning of the palette.
   * @param color
   * @param front
   */
  public addColor(color: Color, front = true) {
    if (this.colors.find((c) => c.name === color.name)) {
      this.colors[this.colors.findIndex((c) => c.name === color.name)] = color
    } else {
      if (front) this.colors.unshift(color)
      else this.colors.push(color)
    }

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
   * Replace color with same name
   * @param color
   */
  replaceColor(color: Color) {
    const index = this.colors.findIndex((c) => c.name === color.name)
    if (index < 0) this.addColor(color, false)
    else this.colors[index] = color
  }

  /**
   * Sort all colors of the palette by hue
   */
  public sortColors() {
    this.colors.sort((a, b) => {
      if (this.order) return a.getShade(500).hue - b.getShade(500).hue
      else return b.getShade(500).hue - a.getShade(500).hue
    })
    this.order = !this.order
  }

  /**
   * Stringify the palette.
   */
  public toString() {
    return JSON.stringify({
      id: this.id,
      title: this.title,
      colors: this.colors,
    })
  }

  /**
   * Parse the json object to a palette.
   * Throws exception if not all values are given.
   * @param json
   */
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  public static parsePalette(json: any): Palette {
    if (!json.title) throw 'Palette has no title'
    if (!json.id) throw 'Palette has no id'
    if (!json.colors) throw 'Palette has no colors'

    const palette = new Palette(json.title, json.id)

    for (const color of json.colors) {
      palette.addColor(Color.parseColor(color))
    }
    palette.colors.reverse()

    return palette
  }
}
