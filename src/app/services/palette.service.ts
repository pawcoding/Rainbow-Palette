import { EventEmitter, Injectable } from '@angular/core'
import { Palette } from '../models/palette.model'
import { PaletteGenerator, PaletteScheme } from '../class/palette-generator'
import { StorageService } from './storage.service'

@Injectable({
  providedIn: 'root',
})
export class PaletteService {
  hex: string | undefined
  scheme: PaletteScheme = PaletteScheme.RAINBOW
  private palette: Palette | undefined
  private paletteChangeEmitter: EventEmitter<Palette | undefined> =
    new EventEmitter()

  constructor(private storageService: StorageService) {
    const palette = storageService.loadPalette()
    if (palette) this.loadPalette(palette)
    else this.clearPalette()
  }

  /**
   * Generate a new color palette with a specific color and scheme
   * @param hex
   * @param scheme
   */
  generatePalette(hex: string, scheme: PaletteScheme) {
    if (!hex.match(/^#[0-9A-Fa-f]{6}$/)) throw 'Hex must be a 6-digit hex code.'

    this.hex = hex
    this.scheme = Object.values(PaletteScheme).indexOf(scheme) % 8
    const palette = PaletteGenerator.generatePalette(hex, scheme)
    this.palette = palette
    this.paletteChangeEmitter.emit(palette)
  }

  /**
   * Load an existing palette
   * @param palette
   */
  loadPalette(palette: Palette) {
    this.hex = palette.colors[0].getShade(500).hex
    this.palette = palette
    this.paletteChangeEmitter.emit(palette)
  }

  /**
   * Unload the current palette
   */
  clearPalette() {
    this.palette = undefined
    this.paletteChangeEmitter.emit(undefined)
  }

  /**
   * Return the current palette
   */
  getPalette() {
    return this.palette
  }

  /**
   * Check if a palette is present
   */
  hasPalette() {
    return !!this.palette
  }

  /**
   * Return the palette change event emitter
   */
  getPaletteChangeEmitter() {
    return this.paletteChangeEmitter
  }
}
