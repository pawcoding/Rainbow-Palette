import { Color } from '../models/color.model'
import { Palette } from '../models/palette.model'
import { LessExporter } from './less.exporter'

const lessRegEx = /@(.*)-(5|([1-9])0)0: +#[0-9A-Fa-f]{6}\b;/g

describe('LessExporter', () => {
  const palette = new Palette('test', '0123456789')
  palette.addColor(Color.generateRandomColor())

  it('Export to LESS for clipboard', () => {
    const scss = new LessExporter().exportContent(palette)
    expect((scss.match(lessRegEx) || []).length).toBe(10)
  })

  it('Export to LESS file', () => {
    const scss = new LessExporter().exportFile(palette)
    expect((scss.match(lessRegEx) || []).length).toBe(10)
  })
})
