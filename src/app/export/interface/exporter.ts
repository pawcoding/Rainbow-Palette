import { Color } from '../../shared/model/color.model';
import { Palette } from '../../shared/model/palette.model';
import { Shade } from '../../shared/model/shade.model';

export interface Exporter {
  filename: string;
  mimeType: string;

  formatFile(palette: Palette): string;

  formatPalette(palette: Palette): string;

  formatColor(color: Color): string;

  formatShade(shade: Shade, name: string): string;
}
