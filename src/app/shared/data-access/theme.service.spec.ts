import { TestBed } from '@angular/core/testing';
import { LocalStorageKey } from '../enums/local-storage-keys';
import { sleep } from '../utils/sleep';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set auto theme by user preference', () => {
    service.setTheme('auto');

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    expect(service.theme()).toBe('auto');
    expect(service.isDark()).toBe(prefersDark);
  });

  it('should change theme', () => {
    service.setTheme('dark');
    expect(service.theme()).toBe('dark');
    expect(service.isDark()).toBe(true);

    service.setTheme('light');
    expect(service.theme()).toBe('light');
    expect(service.isDark()).toBe(false);
  });

  it('should save theme changes to local storage', async () => {
    service.setTheme('dark');
    await sleep(10);
    expect(localStorage.getItem(LocalStorageKey.THEME)).toBe('dark');

    service.setTheme('light');
    await sleep(10);
    expect(localStorage.getItem(LocalStorageKey.THEME)).toBe('light');

    service.setTheme('auto');
    await sleep(10);
    expect(localStorage.getItem(LocalStorageKey.THEME)).toBe('auto');
  });

  afterEach(() => {
    localStorage.removeItem(LocalStorageKey.THEME);
  });
});

describe('ThemeService', () => {
  it('should set dark theme from local storage on initialization', async () => {
    localStorage.setItem(LocalStorageKey.THEME, 'dark');
    TestBed.configureTestingModule({});

    const service = TestBed.inject(ThemeService);
    await sleep(10);
    expect(service.theme()).toBe('dark');

    localStorage.removeItem(LocalStorageKey.THEME);
  });

  it('should set light theme from local storage on initialization', async () => {
    localStorage.setItem(LocalStorageKey.THEME, 'light');
    TestBed.configureTestingModule({});

    const service = TestBed.inject(ThemeService);
    await sleep(10);
    expect(service.theme()).toBe('light');

    localStorage.removeItem(LocalStorageKey.THEME);
  });

  it('should set auto theme from local storage on initialization', async () => {
    localStorage.setItem(LocalStorageKey.THEME, 'auto');
    TestBed.configureTestingModule({});

    const service = TestBed.inject(ThemeService);
    await sleep(10);
    expect(service.theme()).toBe('auto');

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    expect(service.isDark()).toBe(prefersDark);

    localStorage.removeItem(LocalStorageKey.THEME);
  });
});
