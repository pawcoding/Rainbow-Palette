import { EventEmitter, Signal, signal } from '@angular/core'
import { Palette } from '../models/palette.model'
import { Color } from '../models/color.model'
import { StorageService } from '../services/storage.service'

export class StorageServiceMock implements Partial<StorageService> {
  public toggleTheme(dark: boolean | undefined): boolean {
    console.log(`StorageServiceMock.toggleTheme(${dark})`)
    return dark ?? true
  }

  public get dark(): Signal<boolean> {
    console.log('StorageServiceMock.dark()')
    return signal(false).asReadonly()
  }

  language = 'en'

  languageEmitter = new EventEmitter<string>()

  loadLanguage(): void {
    console.log('StorageServiceMock.loadLanguage()')
    this.language = 'en'
    this.languageEmitter.emit('en')
  }

  applyLanguage(language: string): void {
    console.log(`StorageServiceMock.applyLanguage(${language})`)
    this.language = language
    this.languageEmitter.emit(language)
  }

  loadPalette(): Palette | undefined {
    console.log('StorageServiceMock.loadPalette()')
    const palette = new Palette('loadedPalette')
    palette.addColor(new Color('pawcode Blue', '#4472c4'))
    return palette
  }

  savePalette(palette: Palette): void {
    console.log(`StorageServiceMock.savePalette(${palette.title})`)
  }

  rememberTracking(enabled: boolean): void {
    console.log(`StorageServiceMock.rememberTracking(${enabled})`)
  }

  hasTrackingAllowed(): number {
    console.log('StorageServiceMock.hasTrackingAllowed()')
    return 2
  }
}
