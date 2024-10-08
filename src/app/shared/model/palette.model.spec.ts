import { Tailwind } from '../constants/tailwind-colors';
import { Color } from './color.model';
import { Palette } from './palette.model';
import { Shade } from './shade.model';

describe('Palette', () => {
  it('should create an instance', () => {
    expect(new Palette('Test', [])).toBeTruthy();
  });

  it('should parse palette from string', () => {
    const palette = Palette.parse(`{"id": "test-id", "name":"Test","colors":[]}`);

    expect(palette).toBeInstanceOf(Palette);
    expect(palette.id).toBe('test-id');
    expect(palette.name).toBe('Test');
    expect(palette.colors.length).toBe(0);
  });

  it('should parse palette from object', () => {
    const palette = Palette.parse({
      id: 'test-id',
      name: 'Test',
      colors: [new Color([Shade.random()], 'TestColor')]
    });

    expect(palette).toBeInstanceOf(Palette);
    expect(palette.id).toBe('test-id');
    expect(palette.name).toBe('Test');
    expect(palette.colors.length).toBe(1);
  });

  it('should stringify and re-parse palette', () => {
    const palette = new Palette('Test', [new Color([Shade.random()], 'TestColor')], 'test-id');
    const parsed = Palette.parse(palette.toString());

    expect(parsed).toBeInstanceOf(Palette);
    expect(parsed.id).toBe('test-id');
    expect(parsed.name).toBe('Test');
    expect(parsed.colors.length).toBe(1);
  });

  it('should copy palette', () => {
    const palette = Tailwind;
    const copy = palette.copy(true);

    expect(copy).toBeInstanceOf(Palette);
    expect(copy).not.toBe(palette);
    expect(copy.id).toBe(palette.id);
    expect(copy.name).toBe(palette.name);
    expect(copy.colors.length).toBe(palette.colors.length);
    expect(copy.toString()).toBe(palette.toString());
  });

  it('should JSON and string are equal', () => {
    const palette = new Palette('Test', [new Color([Shade.random()], 'TestColor')]);

    expect(palette.toString()).toBe(JSON.stringify(palette.toJSON()));
  });

  it('should add color', () => {
    const palette = new Palette('Test', []);
    const color = new Color([Shade.random()], 'TestColor');

    palette.addColor(color);

    expect(palette.colors.length).toBe(1);
    expect(palette.colors[0]).toBe(color);
  });

  it('should remove color', () => {
    const color = new Color([Shade.random()], 'TestColor');
    const palette = new Palette('Test', [color]);

    palette.removeColor(color);

    expect(palette.colors.length).toBe(0);
  });

  it('should reorder color', () => {
    const color1 = new Color([Shade.random()], 'TestColor1');
    const color2 = new Color([Shade.random()], 'TestColor2');
    const palette = new Palette('Test', [color1, color2]);

    palette.reorderColor(0, 1);

    expect(palette.colors[0]).toBe(color2);
    expect(palette.colors[1]).toBe(color1);
  });
});
