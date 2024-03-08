import { TestBed } from '@angular/core/testing';
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

  it('should set default theme by user preference', () => {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    expect(service.theme()).toBe(prefersDark ? 'dark' : 'light');
  });

  it('should change theme', () => {
    service.setTheme('dark');
    expect(service.theme()).toBe('dark');

    service.setTheme('light');
    expect(service.theme()).toBe('light');
  });

  it('should save theme changes to local storage', async () => {
    service.setTheme('dark');
    await sleep(10);
    expect(localStorage.getItem('theme')).toBe('dark');

    service.setTheme('light');
    await sleep(10);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  afterEach(() => {
    localStorage.removeItem('theme');
  });
});

describe('ThemeService', () => {
  it('should set dark theme from local storage on initialization', async () => {
    localStorage.setItem('theme', 'dark');
    TestBed.configureTestingModule({});

    const service = TestBed.inject(ThemeService);
    await sleep(10);
    expect(service.theme()).toBe('dark');

    localStorage.removeItem('theme');
  });

  it('should set light theme from local storage on initialization', async () => {
    localStorage.setItem('theme', 'light');
    TestBed.configureTestingModule({});

    const service = TestBed.inject(ThemeService);
    await sleep(10);
    expect(service.theme()).toBe('light');

    localStorage.removeItem('theme');
  });
});
