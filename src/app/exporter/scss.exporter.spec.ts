import { Color } from '../models/color.model'
import { Palette } from '../models/palette.model'
import { ScssExporter } from './scss.exporter'

const scssRegEx = /\$(.*)-(5|([1-9])0)0: +#[0-9A-Fa-f]{6}\b;/g

describe('ScssExporter', () => {
  const palette = new Palette('test', '0123456789')
  palette.addColor(Color.generateRandomColor())

  it('Export to SCSS for clipboard', () => {
    const scss = new ScssExporter().exportContent(palette)
    expect((scss.match(scssRegEx) || []).length).toBe(10)
  })

  it('Export to SCSS file', () => {
    const scss = new ScssExporter().exportFile(palette)
    expect((scss.match(scssRegEx) || []).length).toBe(10)
  })
})
