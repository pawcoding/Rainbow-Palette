import { Color } from '../model/color.model';
import { Palette } from '../model/palette.model';
import { Shade } from '../model/shade.model';

export interface Formatter {
  filename: string;
  mimeType: string;

  formatFile(palette: Palette): string;

  formatPalette(palette: Palette): string;

  formatColor(color: Color): string;

  formatShade(shade: Shade, name: string): string;
}
