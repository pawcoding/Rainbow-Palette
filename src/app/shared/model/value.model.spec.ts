import { Value } from './value.model';

describe('Value', () => {
  it('should create valid instances', () => {
    expect(Value.fromHEX('#000000')).toBeTruthy();
    expect(Value.fromHSL({ H: 0, S: 0, L: 0 })).toBeTruthy();
    expect(Value.fromRGB({ R: 0, G: 0, B: 0 })).toBeTruthy();
  });

  it('should throw on invalid values', () => {
    expect(() => Value.fromHEX('')).toThrow();
    expect(() => Value.fromHEX('invalid')).toThrow();

    expect(() => Value.fromHSL({ H: 361, S: 0, L: 0 })).toThrow();
    expect(() => Value.fromHSL({ H: 0, S: 101, L: 0 })).toThrow();
    expect(() => Value.fromHSL({ H: 0, S: 0, L: 101 })).toThrow();

    expect(() => Value.fromRGB({ R: -1, G: 0, B: 0 })).toThrow();
    expect(() => Value.fromRGB({ R: 0, G: 256, B: 0 })).toThrow();
    expect(() => Value.fromRGB({ R: 0, G: 0, B: 256 })).toThrow();
  });

  it('should copy value', () => {
    const values = [
      Value.fromHEX('#FF0000'),
      Value.fromHSL({ H: 209, S: 97, L: 93 }),
      Value.fromRGB({ R: 42, G: 0, B: 69 })
    ];

    for (const value of values) {
      const copy = value.copy();

      expect(copy).toBeInstanceOf(Value);
      expect(copy).not.toBe(value);
      expect(JSON.stringify(copy.HSL)).toBe(JSON.stringify(value.HSL));
      expect(JSON.stringify(copy.RGB)).toBe(JSON.stringify(value.RGB));
      expect(copy.HEX).toBe(value.HEX);
    }
  });
});
