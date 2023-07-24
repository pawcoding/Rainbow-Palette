import { Color } from '../models/color.model'
import { Palette } from '../models/palette.model'
import { TailwindExporter } from './tailwind.exporter'

const tailwindRegEx = /(5|[1-9]0)0: +'#[0-9A-Fa-f]{6}\b'/g

describe('TailwindExporter', () => {
  const palette = new Palette('test', '0123456789')
  palette.addColor(Color.generateRandomColor())

  it('Export to TailwindCSS for clipboard', () => {
    const tailwind = new TailwindExporter().exportContent(palette)
    expect(tailwind).toMatch(/^'.*': {[^}]*}$/)
    expect((tailwind.match(tailwindRegEx) || []).length).toBe(10)
  })

  it('Export to TailwindCSS file', () => {
    const tailwind = new TailwindExporter().exportFile(palette)
    expect(tailwind).toMatch(/^module.exports = {[^}]*}\n}/)
    expect(tailwind).toMatch(/'.*': {[^}]*}/)
    expect((tailwind.match(tailwindRegEx) || []).length).toBe(10)
  })
})
