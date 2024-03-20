import { RGBObject } from '../types/color-format';

/**
 * Returns the perceived brightness of a color in the range 0-100.
 *
 * @param hex The color to calculate the perceived brightness of.
 */
export function perceivedBrightnessFromHex(hex: string): number {
  if (!hex.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
    throw new Error(`Invalid hex color: "${hex}`);
  }

  const rgb = {
    R: parseInt(hex.substring(1, 3), 16),
    G: parseInt(hex.substring(3, 5), 16),
    B: parseInt(hex.substring(5, 7), 16),
  };

  return perceivedBrightnessFromRGB(rgb);
}

/**
 * Returns the perceived brightness of a color in the range 0-100.
 *
 * @param r The red component of the color.
 * @param g The green component of the color.
 * @param b The blue component of the color.
 */
export function perceivedBrightnessFromRGB(rgb: RGBObject): number {
  return Math.round(
    Math.sqrt(
      0.299 * rgb.R * rgb.R + 0.587 * rgb.G * rgb.G + 0.114 * rgb.B * rgb.B
    ) / 2.55
  );
}
