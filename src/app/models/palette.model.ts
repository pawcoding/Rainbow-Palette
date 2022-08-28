import {Color} from "./color.model";

export class Palette {

  title: string
  id: string
  colors: Color[] = []

  constructor(title: string) {
    this.title = title
    this.id = 'sfhaislfhasbfshgf'
  }

  addColor(name: string, hex: string) {
    this.colors.push(new Color(name, hex))
  }

}
