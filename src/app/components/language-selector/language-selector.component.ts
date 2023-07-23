import { Component } from '@angular/core'
import { StorageService } from '../../services/storage.service'
import { languageToCountryCode } from '../../utils/language-to-countrycode.util'
import { LANGUAGES } from '../../constants/languages.constant'
import { MatomoTracker } from 'ngx-matomo-client'

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
})
export class LanguageSelectorComponent {
  LANGUAGES = LANGUAGES

  language = 'en'
  showMenu = false

  constructor(
    private storage: StorageService,
    private tracker: MatomoTracker
  ) {
    this.storage.languageEmitter.subscribe((language) => {
      this.language = language
    })
  }

  /**
   * Switch the language of the app.
   * @param language
   */
  switchLanguage(language: string) {
    this.storage.applyLanguage(language)
    this.showMenu = false
    this.tracker.trackPageView()
  }

  protected readonly languageToCountryCode = languageToCountryCode
}
