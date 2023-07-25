import { Injectable, Signal, computed, inject, signal } from '@angular/core'
import { Palette } from '../models/palette.model'
import { PaletteGenerator, PaletteScheme } from '../class/palette-generator'
import { StorageService } from './storage.service'

@Injectable({
  providedIn: 'root',
})
export class PaletteService {
  private readonly _storageService = inject(StorageService)

  private readonly _latestScheme = signal<PaletteScheme>(PaletteScheme.RAINBOW)
  private readonly _palette = signal<Palette | undefined>(undefined)

  public readonly latestHex = computed(
    () => this._palette()?.colors[0].getShade(500).hex
  )

  public get palette(): Signal<Palette | undefined> {
    return this._palette.asReadonly()
  }

  public get latestScheme(): Signal<PaletteScheme> {
    return this._latestScheme.asReadonly()
  }

  constructor() {
    this._palette.set(this._storageService.loadPalette())
  }

  /**
   * Generate a new color palette with a specific color and scheme
   * @param hex
   * @param scheme
   */
  public generatePalette(hex: string, scheme: PaletteScheme): void {
    if (!hex.match(/^#[0-9A-Fa-f]{6}$/)) {
      throw 'Hex must be a 6-digit hex code.'
    }

    const schemes = Object.values(PaletteScheme)
    const schemeProxy = schemes.indexOf(scheme) % (schemes.length / 2)
    this._latestScheme.set(schemeProxy)
    this._palette.set(PaletteGenerator.generatePalette(hex, scheme))
  }

  /**
   * Check if a palette is present
   */
  public hasPalette(): boolean {
    return !!this._palette()
  }
}
