import { PaletteGenerator, PaletteScheme } from '../class/palette-generator'
import { Palette } from '../models/palette.model'
import { EventEmitter } from '@angular/core'
import { PaletteService } from '../services/palette.service'

export class PaletteServiceMock implements Partial<PaletteService> {
  hex?: string
  scheme: PaletteScheme = PaletteScheme.RAINBOW
  private palette?: Palette
  private paletteChangeEmitter: EventEmitter<Palette | undefined> =
    new EventEmitter()

  generatePalette(hex: string, scheme: PaletteScheme): void {
    console.log(`PaletteServiceMock.generatePalette(${hex}, ${scheme})`)
    this.hex = hex
    this.scheme = Object.values(PaletteScheme).indexOf(scheme) % 8
    this.palette = PaletteGenerator.generatePalette(hex, scheme)
    this.paletteChangeEmitter.emit(this.palette)
  }

  loadPalette(palette: Palette): void {
    console.log(`PaletteServiceMock.loadPalette(${palette})`)
    this.hex = palette.colors[0].getShade(500).hex
    this.palette = palette
    this.paletteChangeEmitter.emit(palette)
  }

  clearPalette(): void {
    console.log('PaletteServiceMock.clearPalette()')
    this.palette = undefined
    this.paletteChangeEmitter.emit(undefined)
  }

  getPalette(): Palette | undefined {
    console.log('PaletteServiceMock.getPalette()')
    return this.palette
  }

  hasPalette(): boolean {
    console.log('PaletteServiceMock.hasPalette()')
    return !!this.palette
  }

  getPaletteChangeEmitter(): EventEmitter<Palette | undefined> {
    console.log('PaletteServiceMock.getPaletteChangeEmitter()')
    return this.paletteChangeEmitter
  }
}
