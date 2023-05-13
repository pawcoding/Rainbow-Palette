import { PaletteExporter } from './palette-exporter'
import { Palette } from '../models/palette.model'
import { Color } from '../models/color.model'

const cssRegEx = /--(.*)-(5|([1-9])0)0: +#[0-9A-Fa-f]{6}\b;/g
const scssRegEx = /\$(.*)-(5|([1-9])0)0: +#[0-9A-Fa-f]{6}\b;/g
const tailwindRegEx = /(5|[1-9]0)0: +'#[0-9A-Fa-f]{6}\b'/g

describe('PaletteExporter', () => {
  const palette = new Palette('test', '0123456789')
  palette.addColor(Color.generateRandomColor())

  it('Export to CSS for clipboard', () => {
    const css = PaletteExporter.exportPaletteToCSS(palette)
    expect((css.match(cssRegEx) || []).length).toBe(10)
  })

  it('Export to CSS file', () => {
    const css = PaletteExporter.exportCSSFile(palette)
    expect(css).toMatch(/^:root {[^}]*}$/)
    expect((css.match(cssRegEx) || []).length).toBe(10)
  })

  it('Export to SCSS for clipboard', () => {
    const scss = PaletteExporter.exportPaletteToSCSS(palette)
    expect((scss.match(scssRegEx) || []).length).toBe(10)
  })

  it('Export to SCSS file', () => {
    const scss = PaletteExporter.exportSCSSFile(palette)
    expect((scss.match(scssRegEx) || []).length).toBe(10)
  })

  it('Export to TailwindCSS for clipboard', () => {
    const tailwind = PaletteExporter.exportPaletteToTailwind(palette)
    expect(tailwind).toMatch(/^'.*': {[^}]*}$/)
    expect((tailwind.match(tailwindRegEx) || []).length).toBe(10)
  })

  it('Export to TailwindCSS file', () => {
    const tailwind = PaletteExporter.exportTailwindFile(palette)
    expect(tailwind).toMatch(/^module.exports = {[^}]*}\n}/)
    expect(tailwind).toMatch(/'.*': {[^}]*}/)
    expect((tailwind.match(tailwindRegEx) || []).length).toBe(10)
  })
})
