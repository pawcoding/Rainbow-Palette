import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { sleep } from '../utils/sleep';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot({ defaultLanguage: 'en' })],
    });
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default language en', () => {
    expect(service.language()).toBe('en');
  });

  it('should change language', () => {
    service.setLanguage('de');
    expect(service.language()).toBe('de');
  });

  it('should save language changes to local storage', async () => {
    service.setLanguage('de');
    await sleep(10);
    expect(localStorage.getItem('language')).toBe('de');
  });

  afterEach(() => {
    localStorage.removeItem('language');
  });
});

describe('LanguageService', () => {
  it('should set language from local storage on initialization', async () => {
    localStorage.setItem('language', 'de');
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
    });

    const service = TestBed.inject(LanguageService);
    await sleep(10);
    expect(service.language()).toBe('de');

    localStorage.removeItem('language');
  });
});
