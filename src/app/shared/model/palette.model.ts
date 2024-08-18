import { moveItemInArray } from '@angular/cdk/drag-drop';
import { generateId } from '../utils/generate-id';
import { Color } from './color.model';

export class Palette {
  public readonly id: string;
  public name: string;
  public readonly colors: Array<Color>;

  public constructor(name: string, colors: Array<Color>, id?: string) {
    this.colors = colors;
    this.name = name;

    this.id = id || generateId(15);
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

  public reorderColor(fromIndex: number, toIndex: number): void {
    if (fromIndex < 0 || fromIndex >= this.colors.length || toIndex < 0 || toIndex >= this.colors.length) {
      throw new Error(`Invalid index: ${toIndex}`);
    }

    moveItemInArray(this.colors, fromIndex, toIndex);
  }

  public copy(shouldCopyId: boolean): Palette {
    return new Palette(
      this.name,
      this.colors.map((color) => color.copy()),
      shouldCopyId ? this.id : undefined
    );
  }

  public static parse(palette: string | object): Palette {
    if (typeof palette === 'string') {
      try {
        palette = JSON.parse(palette);
      } catch (e) {
        throw new Error(`Could not parse palette (not a valid JSON): "${palette}"`, {
          cause: e
        });
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

    let id: string | undefined;
    if ('id' in palette && typeof palette.id === 'string') {
      id = palette.id;
    }

    const colors: Array<Color> = [];
    if (!Array.isArray(palette.colors)) {
      throw new Error(`Could not parse palette (invalid "colors" property): "${palette.colors}"`);
    }

    for (const color of palette.colors) {
      try {
        colors.push(Color.parse(color));
      } catch (e) {
        throw new Error(`Could not parse palette (invalid color): "${color}"`, {
          cause: e
        });
      }
    }

    return new Palette(name || 'Palette', colors, id);
  }

  public toJSON(): object {
    return {
      name: this.name,
      colors: this.colors.map((color) => color.toJSON()),
      id: this.id
    };
  }

  public toString(): string {
    return JSON.stringify(this.toJSON());
  }
}
