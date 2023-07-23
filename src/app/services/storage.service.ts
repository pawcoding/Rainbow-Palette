import {
  EventEmitter,
  Injectable,
  Signal,
  effect,
  inject,
  signal,
} from '@angular/core'
import { Palette } from '../models/palette.model'
import { TranslateService } from '@ngx-translate/core'

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly _translator = inject(TranslateService)

  private readonly _dark = signal(false)

  constructor() {
    // load theme
    let initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

    try {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        initialTheme = savedTheme === 'dark'
      }
    } catch (e) {
      console.error('Could not load theme from local storage.', e)
    }
    this._dark.set(initialTheme)

    // apply theme and sync with local storage
    effect(() => {
      document.body.classList.toggle('dark', this._dark())
      localStorage.setItem('theme', this._dark() ? 'dark' : 'light')
    })
  }

  language = 'en'

  languageEmitter = new EventEmitter<string>()

  /**
   * Toggle between dark and light theme.
   * Force dark or light mode with parameter.
   * @param dark
   */
  public toggleTheme(dark: boolean | undefined): boolean {
    if (dark !== undefined) {
      this._dark.set(dark)
    } else {
      this._dark.set(!this._dark())
    }

    return this._dark()
  }

  public get dark(): Signal<boolean> {
    return this._dark.asReadonly()
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
      this.applyLanguage(this._translator.getBrowserLang() ?? 'en')
    }
  }

  /**
   * Apply language to the app.
   * @param language
   */
  applyLanguage(language: string) {
    this._translator.use(language).subscribe(() => {
      localStorage.setItem('language', language)
      this.language = language
      document.documentElement.setAttribute('lang', language)
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
  savePalette(palette: Palette): void {
    localStorage.setItem('palette', palette.toString())
  }

  /**
   * Remember if the user has enabled tracking for 90 days.
   * @param enabled
   */
  rememberTracking(enabled: boolean): void {
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
