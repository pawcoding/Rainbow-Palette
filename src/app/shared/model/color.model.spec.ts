import { Color } from './color.model';
import { Shade } from './shade.model';

describe('Color', () => {
  it('should create an instance', () => {
    expect(new Color([], '')).toBeTruthy();
  });

  it('should parse color from string', () => {
    const color = Color.parse(
      `{"name": "Test", "shades":[${Shade.random().toString()}]}`
    );

    expect(color).toBeInstanceOf(Color);
    expect(color.name).toBe('Test');
    expect(color.shades.length).toBe(1);

    expect(() =>
      Color.parse(`{"shades":${Shade.random().toString()}}`)
    ).toThrowError();
  });

  it('should parse color from object', () => {
    const color = Color.parse({
      name: 'Test',
      shades: [Shade.random()],
    });

    expect(color).toBeInstanceOf(Color);
    expect(color.name).toBe('Test');
    expect(color.shades.length).toBe(1);
  });

  it('should stringify and re-parse color', () => {
    const color = new Color([Shade.random()], 'Test');
    const parsed = Color.parse(color.toString());

    expect(parsed).toBeInstanceOf(Color);
    expect(parsed.name).toBe('Test');
    expect(parsed.shades.length).toBe(1);
  });

  it('should JSON and string are equal', () => {
    const color = new Color([Shade.random()], 'Test');

    expect(color.toString()).toBe(JSON.stringify(color.toJSON()));
  });
});
