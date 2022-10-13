import {Shade} from "../models/shade.model";
import {HttpClient, HttpXhrBackend} from "@angular/common/http";

export class ColorNamer {

  private static colorDictionary: Entry[] = []
  private static grayDictionary: Entry[] = []

  public static loadDictionary() {
    const http = new HttpClient(new HttpXhrBackend({
      build: () => new XMLHttpRequest()
    }))

    http.get(
      '/assets/color_dictionary.csv',
      { responseType: 'text' }
    ).subscribe(data => {
      const list = data.split('\n')
      list.shift()

      this.colorDictionary = list.map(entry => {
        const split = entry.split(";")
        return {
          name: split[0],
          hue: parseInt(split[1]),
          saturation: parseInt(split[2]),
          luminosity: parseInt(split[3])
        }
      })

      this.grayDictionary.filter(color => color.hue === -1)
    })
  }

  public static nameColor(shade: Shade) {
    if (this.colorDictionary.length + this.grayDictionary.length === 0) {
      console.info('Color dictionary is not loaded (yet).')
      return shade.hex.substring(1)
    }

    const dictionary = shade.saturation === 0 ? this.grayDictionary : this.colorDictionary
    const nearest = dictionary.reduce((prev, curr) =>
        (this.calculateDifference(curr, shade) < this.calculateDifference(prev, shade) ? curr : prev))
    return nearest.name
      .replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase())
  }

  private static calculateDifference(entry: {hue: number, saturation: number, luminosity: number}, shade: Shade) {
    return 10 * Math.abs(entry.hue - shade.hue)
      + 5 * Math.abs(entry.saturation - shade.saturation)
      + Math.abs(entry.luminosity - shade.luminosity)
  }

}

interface Entry {

  name: string,
  hue: number,
  saturation: number,
  luminosity: number

}
