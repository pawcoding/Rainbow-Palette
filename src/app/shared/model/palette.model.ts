import { Color } from './color.model';

export class Palette {
  public name: string;
  public readonly colors: Array<Color>;

  public constructor(name: string, colors: Array<Color>) {
    this.colors = colors;
    this.name = name;
  }

  public addColor(color: Color): void {
    this.colors.push(color);
  }

  public removeColor(color: Color): void {
    const index = this.colors.indexOf(color);
    if (index > -1) {
      this.colors.splice(index, 1);
    }
  }

  public static parse(palette: string | object): Palette {
    if (typeof palette === 'string') {
      try {
        palette = JSON.parse(palette);
      } catch (e) {
        throw new Error(`Could not parse palette (not a valid JSON): "${palette}"`);
      }
    }

    if (!(palette instanceof Object)) {
      throw new Error(`Could not parse palette (not an object): "${palette}"`);
    }

    if (!('colors' in palette)) {
      throw new Error(`Could not parse palette (missing "colors" property): "${palette}"`);
    }

    let name: string | undefined;
    if ('name' in palette && typeof palette.name === 'string') {
      name = palette.name;
    }

    const colors: Array<Color> = [];
    if (!Array.isArray(palette.colors)) {
      throw new Error(`Could not parse palette (invalid "colors" property): "${palette.colors}"`);
    }

    for (const color of palette.colors) {
      try {
        colors.push(Color.parse(color));
      } catch (e) {
        throw new Error(`Could not parse palette (invalid color): "${color}"`);
      }
    }

    return new Palette(name || 'Palette', colors);
  }

  public toJSON(): object {
    return {
      name: this.name,
      colors: this.colors.map((color) => color.toJSON())
    };
  }

  public toString(): string {
    return JSON.stringify(this.toJSON());
  }
}
