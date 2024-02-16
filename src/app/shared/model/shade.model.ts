import { ColorTranslator } from 'colortranslator';

export class Shade {
  public index: number;
  public fixed: boolean;
  private _value: ColorTranslator;

  constructor(index: number, value: ColorTranslator, fixed = false) {
    this.index = index;
    this._value = value;
    this.fixed = fixed;
  }

  public get hslValue(): string {
    return this._value.HSL;
  }

  public get hex(): string {
    return this._value.HEX;
  }
}
