import { EventEmitter } from '@angular/core'
import { Palette } from '../models/palette.model'
import { Color } from '../models/color.model'
import { StorageService } from '../services/storage.service'

export class StorageServiceMock implements Partial<StorageService> {
  dark = false
  language = 'en'

  darkEmitter = new EventEmitter<boolean>()
  languageEmitter = new EventEmitter<string>()

  loadTheme(): boolean {
    console.log('StorageServiceMock.loadTheme()')
    this.dark = false
    this.darkEmitter.emit(false)
    return false
  }

  toggleTheme(dark: boolean | undefined): boolean {
    console.log(`StorageServiceMock.toggleTheme(${dark})`)
    this.dark = dark ?? true
    this.darkEmitter.emit(dark ?? true)
    return dark ?? true
  }

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
