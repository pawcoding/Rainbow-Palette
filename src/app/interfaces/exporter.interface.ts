import { Palette } from '../models/palette.model'

export interface Exporter {
  /**
   * Export the palette for usage in a separate file.
   * @param palette Palette to export
   */
  exportFile(palette: Palette): string

  /**
   * Export the palette to copy and paste into an already existing file.
   * @param palette Palette to export
   */
  exportContent(palette: Palette): string
}
