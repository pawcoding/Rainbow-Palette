import { Formatter } from '../interfaces/formatter.interface';
import { Color } from '../model/color.model';
import { Palette } from '../model/palette.model';
import { Shade } from '../model/shade.model';

export class ScssFormatter implements Formatter {
  public filename = '_colors.scss';
  public mimeType = 'text/scss';

  public formatFile(palette: Palette): string {
    const content = this.formatPalette(palette);

    return `/* Import the variables into your SCSS files with\n\t@use 'colors';\n*/\n\n${content}`;
  }

  public formatPalette(palette: Palette): string {
    const content = palette.colors.map((color) => this.formatColor(color)).join('\n\n');

    return `/* Color palette generated by ${window.location.origin} */\n\n${content}`;
  }

  public formatColor(color: Color): string {
    const name = color.name.replace(/\s+/g, '-').toLowerCase();
    const shades = color.shades.map((shade) => this.formatShade(shade, name)).join('\n');

    return shades;
  }

  public formatShade(shade: Shade, name: string): string {
    return `$${name}-${shade.index}:${shade.index < 100 ? ' ' : ''} ${shade.hex};`;
  }
}
