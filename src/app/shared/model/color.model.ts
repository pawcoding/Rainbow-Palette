import { ColorTranslator } from 'colortranslator';
import { Shade } from './shade.model';

export class Color {
  public readonly shades: Array<Shade> = [
    new Shade(0, new ColorTranslator('#3B82F6', { decimals: 2 }), true),
    new Shade(0, new ColorTranslator('#3B82F6', { decimals: 2 }), true),
    new Shade(0, new ColorTranslator('#3B82F6', { decimals: 2 }), true),
    new Shade(0, new ColorTranslator('#3B82F6', { decimals: 2 }), true),
    new Shade(0, new ColorTranslator('#3B82F6', { decimals: 2 }), true),
    new Shade(0, new ColorTranslator('#3B82F6', { decimals: 2 }), true),
    new Shade(0, new ColorTranslator('#3B82F6', { decimals: 2 }), true),
    new Shade(0, new ColorTranslator('#3B82F6', { decimals: 2 }), true),
    new Shade(0, new ColorTranslator('#3B82F6', { decimals: 2 }), true),
    new Shade(0, new ColorTranslator('#3B82F6', { decimals: 2 }), true),
  ];
}
