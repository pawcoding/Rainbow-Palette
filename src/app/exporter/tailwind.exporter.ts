import { Exporter } from '../interfaces/exporter.interface'
import { Color } from '../models/color.model'
import { Palette } from '../models/palette.model'
import { Shade } from '../models/shade.model'

export class TailwindExporter implements Exporter {
  /**
   * Export a palette for usage in a separate tailwind.colors.js file.
   * @param palette Palette to export
   */
  exportFile(palette: Palette) {
    return `module.exports = {\n\t${this.exportContent(palette).replace(
      /\n/g,
      '\n\t'
    )}\n}`
  }

  /**
   * Export a palette for usage in TailwindCSS.
   * @param palette Palette to export
   */
  exportContent(palette: Palette) {
    return palette.colors.map((c) => this.exportColorToTailwind(c)).join(',\n')
  }

  /**
   * Export a color for usage in TailwindCSS.
   * @param color Color to export
   * @private
   */
  private exportColorToTailwind(color: Color) {
    const name = color.name.replace(/\s+/g, '-').toLowerCase()
    return `'${name}': {\n${color.shades
      .map((s) => this.exportShadeToTailwind(s))
      .join(',\n')}\n}`
  }

  /**
   * Export a shade for usage in TailwindCSS.
   * @param shade Shade to export
   * @private
   */
  private exportShadeToTailwind(shade: Shade) {
    return `\t${shade.index}:${shade.index < 100 ? ' ' : ''} '${shade.hex}'`
  }
}
