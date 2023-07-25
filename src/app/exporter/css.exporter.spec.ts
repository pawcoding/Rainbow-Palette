import { Color } from '../models/color.model'
import { Palette } from '../models/palette.model'
import { CssExporter } from './css.exporter'

const cssRegEx = /--(.*)-(5|([1-9])0)0: +#[0-9A-Fa-f]{6}\b;/g

describe('CssExporter', () => {
  const palette = new Palette('test', '0123456789')
  palette.addColor(Color.generateRandomColor())

  it('Export to CSS for clipboard', () => {
    const css = new CssExporter().exportContent(palette)
    expect((css.match(cssRegEx) || []).length).toBe(10)
  })

  it('Export to CSS file', () => {
    const css = new CssExporter().exportFile(palette)
    expect(css).toMatch(/^:root {[^}]*}$/)
    expect((css.match(cssRegEx) || []).length).toBe(10)
  })
})
