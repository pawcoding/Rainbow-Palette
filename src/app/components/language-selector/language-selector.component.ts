import { Component } from '@angular/core'
import { StorageService } from '../../services/storage.service'
import { languageToCountryCode } from '../../utils/language-to-countrycode.util'
import { LANGUAGES } from '../../constants/languages.constant'

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css'],
})
export class LanguageSelectorComponent {
  LANGUAGES = LANGUAGES

  language = 'en'
  country = 'us'
  showMenu = false

  constructor(private storage: StorageService) {
    this.storage.languageEmitter.subscribe((language) => {
      this.language = language
      this.country = languageToCountryCode(language)
    })
  }

  /**
   * Switch the language of the app.
   * @param language
   */
  switchLanguage(language: string) {
    this.storage.applyLanguage(language)
    this.showMenu = false
  }

  protected readonly languageToCountryCode = languageToCountryCode
}
