import { Color } from './color.model';
import { Palette } from './palette.model';
import { Shade } from './shade.model';

describe('Palette', () => {
  it('should create an instance', () => {
    expect(new Palette('Test', [])).toBeTruthy();
  });

  it('should parse palette from string', () => {
    const palette = Palette.parse(`{"name":"Test","colors":[]}`);

    expect(palette).toBeInstanceOf(Palette);
    expect(palette.name).toBe('Test');
    expect(palette.colors.length).toBe(0);
  });

  it('should parse palette from object', () => {
    const palette = Palette.parse({
      name: 'Test',
      colors: [new Color([Shade.random()], 'TestColor')],
    });

    expect(palette).toBeInstanceOf(Palette);
    expect(palette.name).toBe('Test');
    expect(palette.colors.length).toBe(1);
  });

  it('should stringify and re-parse palette', () => {
    const palette = new Palette('Test', [
      new Color([Shade.random()], 'TestColor'),
    ]);
    const parsed = Palette.parse(palette.toString());

    expect(parsed).toBeInstanceOf(Palette);
    expect(parsed.name).toBe('Test');
    expect(parsed.colors.length).toBe(1);
  });

  it('should JSON and string are equal', () => {
    const palette = new Palette('Test', [
      new Color([Shade.random()], 'TestColor'),
    ]);

    expect(palette.toString()).toBe(JSON.stringify(palette.toJSON()));
  });
});
