import { Color, Shade } from '../model';

/**
 * Extracts the text color from a shade based on the perceived brightness of the shade to have a good contrast with the background color.
 *
 * @param shade The shade to extract the text color from.
 * @param color The color the shade belongs to to determine the contrasting text color.
 */
export function textColor(shade: Shade, color: Color): string {
  if (shade.perceivedBrightness > 51) {
    return color.shades[color.shades.length - 1].hex;
  } else {
    return color.shades[0].hex;
  }
}
