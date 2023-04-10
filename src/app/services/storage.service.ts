import { EventEmitter, Injectable } from '@angular/core'
import { Palette } from '../models/palette.model'
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  dark = false
  language = 'en'

  darkEmitter = new EventEmitter<boolean>()
  languageEmitter = new EventEmitter<string>()

  constructor(private translate: TranslateService) {}

  /**
   * Load the theme if it is stored in local storage.
   * If no theme was saved, the browser default theme is used.
   */
  loadTheme() {
    if (!localStorage.getItem('theme')) {
      if (window.matchMedia('(prefers-color-scheme: dark)'))
        return this.toggleTheme(true)
      else {
        this.darkEmitter.emit(true)
        return false
      }
    } else {
      return this.toggleTheme(localStorage.getItem('theme') === 'dark')
    }
  }

  /**
   * Toggle between dark and light theme.
   * Force dark or light mode with parameter.
   * @param dark
   */
  toggleTheme(dark: boolean | undefined) {
    document.body.classList.toggle('dark', dark)

    dark = document.body.classList.contains('dark')
    localStorage.setItem('theme', dark ? 'dark' : 'light')

    this.darkEmitter.emit(dark)

    return (this.dark = dark)
  }

  /**
   * Load the language saved in local storage.
   * If no language is saved, the browser default language is used.
   * If the browser default language is not supported, english is used.
   */
  loadLanguage(): void {
    if (localStorage.getItem('language')) {
      this.applyLanguage(localStorage.getItem('language') ?? 'en')
    } else {
      this.applyLanguage(this.translate.getBrowserLang() ?? 'en')
    }
  }

  /**
   * Apply language to the app.
   * @param language
   */
  applyLanguage(language: string) {
    this.translate.use(language).subscribe(() => {
      localStorage.setItem('language', language)
      this.language = language
      this.languageEmitter.emit(language)
    })
  }

  /**
   * Load the palette saved in local storage.
   * If no palette is saved a random one is going to be generated.
   */
  loadPalette(): Palette | undefined {
    const stored = localStorage.getItem('palette')
    if (stored) {
      try {
        return Palette.parsePalette(JSON.parse(stored))
      } catch (e) {
        console.error(e)
      }
    }
    return undefined
  }

  /**
   * Save palette in local storage.
   * @param palette
   */
  savePalette(palette: Palette) {
    localStorage.setItem('palette', palette.toString())
  }

  /**
   * Remember if the user has enabled tracking for 90 days.
   * @param enabled
   */
  rememberTracking(enabled: boolean) {
    const item = {
      value: enabled,
      expiry: Date.now() + 1000 * 60 * 60 * 24 * 90,
    }

    localStorage.setItem('tracking', JSON.stringify(item))
  }

  /**
   * Check if the user has disabled tracking.
   * @returns {number} 0 = disabled, 1 = enabled, 2 = not set
   */
  hasTrackingAllowed(): number {
    const item = localStorage.getItem('tracking')
    if (item) {
      try {
        const parsed = JSON.parse(item)
        if (parsed.expiry < Date.now()) {
          localStorage.removeItem('tracking')
          return 2
        } else {
          if (parsed.value) {
            this.rememberTracking(true)
          }

          return parsed.value ? 1 : 0
        }
      } catch (e) {
        console.error(e)
      }
    }
    return 2
  }
}
