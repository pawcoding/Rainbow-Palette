import { Color } from '../model/color.model';
import { Palette } from '../model/palette.model';
import { Shade } from '../model/shade.model';
import { Formatter } from '../interfaces/formatter.interface';

export class TailwindFormatter implements Formatter {
  public filename = 'tailwind.colors.js';
  public mimeType = 'text/javascript';

  public formatFile(palette: Palette): string {
    const content = this.formatPalette(palette).replace(/\n/g, '\n\t');

    return `module.exports = {\n\t${content}\n}`;
  }

  public formatPalette(palette: Palette): string {
    return palette.colors.map((color) => this.formatColor(color)).join(',\n');
  }

  public formatColor(color: Color): string {
    const name = color.name.replace(/\s+/g, '-').toLowerCase();
    const shades = color.shades
      .map((shade) => this.formatShade(shade))
      .join(',\n');

    return `'${name}': {\n${shades}\n}`;
  }

  public formatShade(shade: Shade): string {
    return `\t${shade.index}:${shade.index < 100 ? ' ' : ''} '${shade.hex}'`;
  }
}
