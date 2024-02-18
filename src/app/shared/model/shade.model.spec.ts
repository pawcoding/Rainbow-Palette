import { ColorTranslator } from 'colortranslator';
import { Shade } from './shade.model';

describe('Shade', () => {
  it('should create an instance', () => {
    expect(
      new Shade(0, new ColorTranslator('#000000', { decimals: 2 }))
    ).toBeTruthy();
  });

  it('should generate random shade', () => {
    expect(Shade.random()).toBeInstanceOf(Shade);
  });

  it('should return hex value', () => {
    const shade = new Shade(0, new ColorTranslator('#000000', { decimals: 2 }));

    expect(shade.hex).toBe('#000000');
  });

  it('should return HSL value', () => {
    const shade = new Shade(0, new ColorTranslator('#FF0000', { decimals: 2 }));

    expect(shade.hsl).toEqual({ H: 0, S: 100, L: 50 });
  });

  it('should return perceived brightness', () => {
    const shade = new Shade(0, new ColorTranslator('#FF0000', { decimals: 2 }));

    expect(shade.perceivedBrightness).toBe(55);
  });

  it('should update hex value', () => {
    const shade = new Shade(0, new ColorTranslator('#FF0000', { decimals: 2 }));
    shade.hex = '#000000';

    expect(shade.hex).toBe('#000000');
    expect(shade.perceivedBrightness).toBe(0);
  });

  it('should update HSL value', () => {
    const shade = new Shade(0, new ColorTranslator('#FF0000', { decimals: 2 }));
    shade.hsl = { H: 0, S: 0, L: 0 };

    expect(shade.hsl).toEqual({ H: 0, S: 0, L: 0 });
    expect(shade.perceivedBrightness).toBe(0);
  });

  it('should have value defined', () => {
    const shade = new Shade(0, new ColorTranslator('#FF0000', { decimals: 2 }));

    if (typeof shade.value === 'string') {
      expect(shade.value).toBe(shade.hex);
    } else {
      expect(shade.value).toEqual(shade.hsl);
    }
  });

  it('should copy shade', () => {
    const shade = new Shade(
      0,
      new ColorTranslator('#FF0000', { decimals: 2 }),
      true
    );
    const copy = shade.copy();

    expect(copy).toBeInstanceOf(Shade);
    expect(copy.hex).toBe('#FF0000');
    expect(copy.index).toBe(0);
    expect(copy.fixed).toBe(true);
    expect(copy).not.toBe(shade);
  });

  it('should parse shade from string', () => {
    const shade = Shade.parse('{"value":"#000000"}');

    expect(shade).toBeInstanceOf(Shade);
    expect(shade.hex).toBe('#000000');
  });

  it('should parse shade from object', () => {
    const shade = Shade.parse({ index: 1, fixed: true, value: '#000000' });

    expect(shade).toBeInstanceOf(Shade);
    expect(shade.hex).toBe('#000000');
    expect(shade.index).toBe(1);
    expect(shade.fixed).toBe(true);
  });

  it('should stringify and re-parse shade', () => {
    const shade = new Shade(
      1,
      new ColorTranslator('#000000', { decimals: 2 }),
      true
    );
    const parsed = Shade.parse(shade.toString());

    expect(parsed).toBeInstanceOf(Shade);
    expect(parsed.hex).toBe('#000000');
    expect(parsed.index).toBe(1);
    expect(parsed.fixed).toBe(true);
  });
});
