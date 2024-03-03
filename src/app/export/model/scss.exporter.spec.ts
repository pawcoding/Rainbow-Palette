import { Color } from '../../shared/model/color.model';
import { Palette } from '../../shared/model/palette.model';
import { Shade } from '../../shared/model/shade.model';
import { ScssExporter } from './scss.exporter';

const scssRegEx = /\$(.*)-(5|([1-9])0)0: +#[0-9A-Fa-f]{6}\b;/g;

describe('ScssExporter', () => {
  let exporter: ScssExporter;
  let shade: Shade;
  let color: Color;
  let palette: Palette;

  beforeEach(() => {
    exporter = new ScssExporter();
    shade = Shade.random();
    shade.index = 500;
    const shade2 = Shade.random();
    shade2.index = 100;
    color = new Color([shade2, shade], 'Test Color');
    palette = new Palette('Test Palette', [color]);
  });

  it('should format shade', () => {
    const result = exporter.formatShade(shade, 'test-color');

    expect(result).toMatch(scssRegEx);
    expect(result).toContain(shade.hex);
    expect(result).toContain('test-color');
  });

  it('should format color', () => {
    const result = exporter.formatColor(color);

    expect(result).toContain(shade.hex);
    expect(result).toContain('test-color');
    expect(result.match(scssRegEx) ?? []).toHaveSize(2);
  });

  it('should format palette', () => {
    const result = exporter.formatPalette(palette);

    expect(result).toContain(shade.hex);
    expect(result).toContain('test-color');
    expect(result.match(scssRegEx) ?? []).toHaveSize(2);
  });

  it('should format file', () => {
    const result = exporter.formatFile(palette);

    expect(result).toContain(shade.hex);
    expect(result).toContain('test-color');
    expect(result.match(scssRegEx) ?? []).toHaveSize(2);
  });
});
