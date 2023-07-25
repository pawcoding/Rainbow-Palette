import { Signal, signal } from '@angular/core'
import { Palette } from '../models/palette.model'
import { Color } from '../models/color.model'
import { StorageService } from '../services/storage.service'

export class StorageServiceMock implements Partial<StorageService> {
  public get dark(): Signal<boolean> {
    console.log('StorageServiceMock.dark()')
    return signal(false).asReadonly()
  }

  public get language(): Signal<string> {
    console.log('StorageServiceMock.language()')
    return signal('en').asReadonly()
  }

  public toggleTheme(dark: boolean | undefined): boolean {
    console.log(`StorageServiceMock.toggleTheme(${dark})`)
    return dark ?? true
  }

  public setLanguage(language: string): void {
    console.log(`StorageServiceMock.setLanguage(${language})`)
  }

  public loadPalette(): Palette | undefined {
    console.log('StorageServiceMock.loadPalette()')
    const palette = new Palette('loadedPalette')
    palette.addColor(new Color('pawcode Blue', '#4472c4'))
    return palette
  }

  public savePalette(palette: Palette): void {
    console.log(`StorageServiceMock.savePalette(${palette.title})`)
  }

  public rememberTracking(enabled: boolean): void {
    console.log(`StorageServiceMock.rememberTracking(${enabled})`)
  }

  public hasTrackingAllowed(): number {
    console.log('StorageServiceMock.hasTrackingAllowed()')
    return 2
  }
}
