import { Shade } from './shade.model';
import { Value } from './value.model';

describe('Shade', () => {
  it('should create an instance', () => {
    expect(new Shade(0, Value.fromHEX('#000000'))).toBeTruthy();
  });

  it('should generate random shade', () => {
    expect(Shade.random()).toBeInstanceOf(Shade);
  });

  it('should return hex value', () => {
    const shade = new Shade(0, Value.fromHEX('#000000'));

    expect(shade.hex).toBe('#000000');
  });

  it('should return HSL value', () => {
    const shade = new Shade(0, Value.fromHEX('#FF0000'));

    expect(shade.hsl).toEqual({ H: 0, S: 100, L: 50 });
  });

  it('should return perceived brightness', () => {
    const shade = new Shade(0, Value.fromHEX('#FF0000'));

    expect(shade.perceivedBrightness).toBe(55);
  });

  it('should update hex value', () => {
    const shade = new Shade(0, Value.fromHEX('#FF0000'));
    shade.hex = '#000000';

    expect(shade.hex).toBe('#000000');
    expect(shade.perceivedBrightness).toBe(0);
  });

  it('should update HSL value', () => {
    const shade = new Shade(0, Value.fromHEX('#FF0000'));
    shade.hsl = { H: 0, S: 0, L: 0 };

    expect(shade.hsl).toEqual({ H: 0, S: 0, L: 0 });
    expect(shade.perceivedBrightness).toBe(0);
  });

  it('should have value defined', () => {
    const shade = new Shade(0, Value.fromHEX('#FF0000'));

    if (typeof shade.value === 'string') {
      expect(shade.value).toBe(shade.hex);
    } else {
      expect(shade.value).toEqual(shade.hsl);
    }
  });

  it('should copy shade', () => {
    const shade = new Shade(0, Value.fromHEX('#FF0000'), true);
    const copy = shade.copy();

    expect(copy).toBeInstanceOf(Shade);
    expect(copy).not.toBe(shade);
    expect(copy.index).toBe(shade.index);
    expect(copy.fixed).toBe(shade.fixed);
    expect(copy.hslValue).toBe(shade.hslValue);
    expect(copy.hex).toBe(shade.hex);
    expect(copy.perceivedBrightness).toBe(shade.perceivedBrightness);
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
    const shade = new Shade(1, Value.fromHEX('#000000'), true);
    const parsed = Shade.parse(shade.toString());

    expect(parsed).toBeInstanceOf(Shade);
    expect(parsed.hex).toBe('#000000');
    expect(parsed.index).toBe(1);
    expect(parsed.fixed).toBe(true);
  });

  it('should JSON and string are equal', () => {
    const shade = new Shade(1, Value.fromHEX('#000000'), true);

    expect(shade.toString()).toBe(JSON.stringify(shade.toJSON()));
  });
});
