import { Injectable, Signal, effect, inject, signal } from '@angular/core';
import { Language } from '../../layout/types/language';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { LANGUAGE_OPTIONS } from '../../layout/constants/languages';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly _translateService = inject(TranslateService);

  private readonly _language = signal<Language>('en');

  public get language(): Signal<Language> {
    return this._language.asReadonly();
  }

  constructor() {
    effect(async () => {
      await firstValueFrom(this._translateService.use(this._language()));
      localStorage.setItem('language', this._language());
      document.documentElement.setAttribute('lang', this._language());
    });

    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      this._language.set(storedLanguage as Language);
      return;
    }

    const browserLang = this._translateService.getBrowserLang();
    if (LANGUAGE_OPTIONS.find((option) => option.value === browserLang)) {
      this._language.set(browserLang as Language);
    } else {
      this._language.set('en');
    }
  }

  public setLanguage(language: Language): void {
    this._language.set(language);
  }
}
