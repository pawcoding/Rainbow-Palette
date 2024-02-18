import { Color } from './color.model';
import { Shade } from './shade.model';

describe('Color', () => {
  it('should create an instance', () => {
    expect(new Color([])).toBeTruthy();
  });

  it('should generate random color', () => {
    expect(Color.random()).toBeInstanceOf(Color);
  });

  it('should parse color from string', () => {
    const color = Color.parse(`{"shades":[${Shade.random().toString()}]}`);

    expect(color).toBeInstanceOf(Color);
    expect(color.shades.length).toBe(1);
  });

  it('should parse color from object', () => {
    debugger;
    const color = Color.parse({
      name: 'Red',
      shades: [Shade.random()],
    });

    expect(color).toBeInstanceOf(Color);
    expect(color.name).toBe('Red');
    expect(color.shades.length).toBe(1);
  });

  it('should stringify and re-parse color', () => {
    const color = new Color([Shade.random()], 'Red');
    const parsed = Color.parse(color.toString());

    expect(parsed).toBeInstanceOf(Color);
    expect(parsed.name).toBe('Red');
    expect(parsed.shades.length).toBe(1);
  });
});
