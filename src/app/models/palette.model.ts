import {ColorInterpolater} from "../class/color-interpolater";

export class Palette {

  name = 'pawcode'

  colors = {
    50: '#edf1f9',
    100: '#dae3f3',
    200: '#b5c7e7',
    300: '#8fabdb',
    400: '#6a8ed0',
    500: '#4472c4',
    600: '#365b9d',
    700: '#294476',
    800: '#1c2e4f',
    900: '#0e1727'
  }

  constructor(color: string, name: string) {
    if (!color.startsWith('#') || color.length !== 7)
      throw `Color '${color}' is not in form #RRGGBB.`

    this.name = name
    this.colors = ColorInterpolater.generatePalette(color)
  }

}
