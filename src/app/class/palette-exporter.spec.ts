import { PaletteExporter } from './palette-exporter'
import { Palette } from '../models/palette.model'
import { Color } from '../models/color.model'

describe('PaletteExporter', () => {
  const palette = new Palette('test', '0123456789')
  palette.addColor(Color.generateRandomColor())

  it('should return css strings', () => {
    const cssRegEx = /--(.*)-(5|([1-9])0)0: +#[0-9A-Fa-f]{6}\b;/g

    let css = PaletteExporter.exportPaletteToCSS(palette)
    expect((css.match(cssRegEx) || []).length).toBe(10)

    css = PaletteExporter.exportCssFile(palette)
    expect(css).toMatch(/^:root {[^}]*}$/)
    expect((css.match(cssRegEx) || []).length).toBe(10)
  })

  it('should return tailwind colors', () => {
    const tailwindRegEx = /(5|[1-9]0)0: +'#[0-9A-Fa-f]{6}\b'/g

    let tailwind = PaletteExporter.exportPaletteToTailwind(palette)
    expect(tailwind).toMatch(/^'.*': {[^}]*}$/)
    expect((tailwind.match(tailwindRegEx) || []).length).toBe(10)

    tailwind = PaletteExporter.exportTailwindFile(palette)
    expect(tailwind).toMatch(/^module.exports = {[^}]*}\n}/)
    expect(tailwind).toMatch(/'.*': {[^}]*}/)
    expect((tailwind.match(tailwindRegEx) || []).length).toBe(10)
  })
})
