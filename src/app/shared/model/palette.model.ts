import { Color } from './color.model';

export class Palette {
  public name: string;
  public readonly colors: Array<Color>;

  constructor(name: string, colors: Array<Color>) {
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
}
