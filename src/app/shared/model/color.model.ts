import { Shade } from './shade.model';

export class Color {
  public name = 'Blue';
  public shades: Array<Shade>;

  constructor(shades: Array<Shade>, name?: string) {
    this.shades = shades;
    if (name) {
      this.name = name;
    } else {
      this.name = 'Blue';
    }
  }

  public get hue(): number {
    return this.shades
      .map((shade) => shade.hsl)
      .reduce((hue, hsl) => {
        return hue + hsl.H / this.shades.length;
      }, 0);
  }

  public static parse(color: string | object): Color {
    if (typeof color === 'string') {
      try {
        color = JSON.parse(color);
      } catch (e) {
        console.error(e);
        throw new Error(`Could not parse color (not a valid JSON): "${color}"`);
      }
    }

    if (!(color instanceof Object)) {
      throw new Error(`Could not parse color (not an object): "${color}"`);
    }

    if (!('shades' in color)) {
      throw new Error(
        `Could not parse color (missing "shades" property): "${color}"`
      );
    }

    let name: string | undefined;
    if ('name' in color && typeof color.name === 'string') {
      name = color.name;
    }

    let shades: Array<Shade> = [];
    if (!Array.isArray(color.shades)) {
      throw new Error(
        `Could not parse color (invalid "shades" property): "${color.shades}"`
      );
    }

    for (const shade of color.shades) {
      try {
        shades.push(Shade.parse(shade));
      } catch (e) {
        console.error(e);
        throw new Error(`Could not parse color (invalid shade): "${shade}"`);
      }
    }

    return new Color(shades, name);
  }

  public toJSON(): object {
    return {
      name: this.name,
      shades: this.shades.map((shade) => shade.toJSON()),
    };
  }

  public toString(): string {
    return JSON.stringify(this.toJSON());
  }
}
