import {Shade} from "../models/shade.model";
import ColorDictionary from "../utils/color_dictionary.json";

export class ColorNamer {

  private static colorDictionary = ColorDictionary
  private static grayDictionary = ColorDictionary.filter(c => c.hue === -1)

  public static nameColor(shade: Shade) {
    const dictionary = shade.saturation === 0 ? this.grayDictionary : this.colorDictionary
    const nearest = dictionary.reduce((prev, curr) =>
        (this.calculateDifference(curr, shade) < this.calculateDifference(prev, shade) ? curr : prev))
    return nearest.name.toLowerCase().replace(/ /g, '-')
  }

  private static calculateDifference(entry: {hue: number, saturation: number, luminosity: number}, shade: Shade) {
    return 10 * Math.abs(entry.hue - shade.hue)
      + 5 * Math.abs(entry.saturation - shade.saturation)
      + Math.abs(entry.luminosity - shade.luminosity)
  }

}
