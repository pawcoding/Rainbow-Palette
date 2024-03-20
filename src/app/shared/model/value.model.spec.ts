import { Value } from './value.model';

describe('Value', () => {
  it('should create valid instances', () => {
    expect(new Value('#000000')).toBeTruthy();
    expect(new Value({ H: 0, S: 0, L: 0 })).toBeTruthy();
    expect(new Value({ R: 0, G: 0, B: 0 })).toBeTruthy();
  });

  it('should throw on invalid values', () => {
    expect(() => new Value('')).toThrow();
    expect(() => new Value('invalid')).toThrow();

    expect(() => new Value({ H: 361, S: 0, L: 0 })).toThrow();
    expect(() => new Value({ H: 0, S: 101, L: 0 })).toThrow();
    expect(() => new Value({ H: 0, S: 0, L: 101 })).toThrow();

    expect(() => new Value({ R: -1, G: 0, B: 0 })).toThrow();
    expect(() => new Value({ R: 0, G: 256, B: 0 })).toThrow();
    expect(() => new Value({ R: 0, G: 0, B: 256 })).toThrow();
  });
});
