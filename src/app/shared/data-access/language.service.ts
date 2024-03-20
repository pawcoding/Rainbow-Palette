import { Injectable, Signal, effect, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { LANGUAGE_OPTIONS } from '../../layout/constants/languages';
import { Language } from '../../layout/types/language';
import { LocalStorageKey } from '../enums/local-storage-keys';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly _translateService = inject(TranslateService);
  private readonly _titleService = inject(Title);

  private readonly _language = signal<Language>('en');

  public get language(): Signal<Language> {
    return this._language.asReadonly();
  }

  public constructor() {
    effect(async () => {
      await firstValueFrom(this._translateService.use(this._language()));
      localStorage.setItem(LocalStorageKey.LANGUAGE, this._language());
      document.documentElement.setAttribute('lang', this._language());
      this._titleService.setTitle(this._translateService.instant('title'));
    });

    const storedLanguage = localStorage.getItem(LocalStorageKey.LANGUAGE);
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

export class LanguageServiceMock {
  public readonly language = signal<Language>('en').asReadonly();
  public setLanguage(_language: Language): void {}
}
