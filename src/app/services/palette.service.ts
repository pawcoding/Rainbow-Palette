import {EventEmitter, Injectable} from '@angular/core';
import {Palette} from "../models/palette.model";
import {PaletteGenerator, PaletteScheme} from "../class/palette-generator";

@Injectable({
  providedIn: 'root'
})
export class PaletteService {

  hex: string | undefined
  scheme: PaletteScheme = PaletteScheme.SURPRISE_ME
  private palette: Palette | undefined
  private paletteChangeEmitter: EventEmitter<Palette | undefined> = new EventEmitter()

  constructor() { }

  generatePalette(hex: string, scheme: PaletteScheme) {
    if (!hex.match(/^#[0-9A-Fa-f]{6}$/))
      throw 'Hex must be a 6-digit hex code.'

    this.hex = hex
    this.scheme = Object.values(PaletteScheme).indexOf(scheme) % 8
    const palette = PaletteGenerator.generatePalette(hex, scheme)
    this.updatePalette(palette)
  }

  loadPalette(palette: Palette) {
    this.hex = palette.colors[0].getShade(500).hex
    this.updatePalette(palette)
  }

  private updatePalette(palette: Palette) {
    this.palette = palette
    this.paletteChangeEmitter.emit(palette)
  }

  clearPalette() {
    this.palette = undefined
    this.paletteChangeEmitter.emit(undefined)
  }

  getPalette() {
    return this.palette
  }

  hasPalette() {
    return !!this.palette
  }

  getPaletteChangeEmitter() {
    return this.paletteChangeEmitter
  }

}
