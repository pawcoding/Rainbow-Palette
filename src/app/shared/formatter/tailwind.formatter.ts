import { Color } from '../model/color.model';
import { Palette } from '../model/palette.model';
import { Shade } from '../model/shade.model';
import { Formatter } from '../interfaces/formatter.interface';

export class TailwindFormatter implements Formatter {
  filename = 'tailwind.colors.js';
  mimeType = 'text/javascript';

  formatFile(palette: Palette): string {
    const content = this.formatPalette(palette).replace(/\n/g, '\n\t');

    return `module.exports = {\n\t${content}\n}`;
  }

  formatPalette(palette: Palette): string {
    return palette.colors.map((color) => this.formatColor(color)).join(',\n');
  }

  formatColor(color: Color): string {
    const name = color.name.replace(/\s+/g, '-').toLowerCase();
    const shades = color.shades
      .map((shade) => this.formatShade(shade))
      .join(',\n');

    return `'${name}': {\n${shades}\n}`;
  }

  formatShade(shade: Shade): string {
    return `\t${shade.index}:${shade.index < 100 ? ' ' : ''} '${shade.hex}'`;
  }
}
