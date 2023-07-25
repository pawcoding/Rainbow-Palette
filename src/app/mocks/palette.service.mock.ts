import { PaletteGenerator, PaletteScheme } from '../class/palette-generator'
import { Palette } from '../models/palette.model'
import { Signal, computed, signal } from '@angular/core'
import { PaletteService } from '../services/palette.service'

export class PaletteServiceMock implements Partial<PaletteService> {
  private readonly _palette = signal<Palette | undefined>(undefined)

  public readonly latestHex = computed(() => '#4472c4')

  public get palette(): Signal<Palette | undefined> {
    return this._palette.asReadonly()
  }

  public get latestScheme(): Signal<PaletteScheme> {
    return computed(() => PaletteScheme.RAINBOW)
  }

  constructor() {
    this.generatePalette('#4472c4', PaletteScheme.RAINBOW)
  }

  public generatePalette(hex: string, scheme: PaletteScheme): void {
    console.log(`PaletteServiceMock.generatePalette(${hex}, ${scheme})`)
    this._palette.set(PaletteGenerator.generatePalette(hex, scheme))
  }

  public hasPalette(): boolean {
    console.log('PaletteServiceMock.hasPalette()')
    return true
  }
}
