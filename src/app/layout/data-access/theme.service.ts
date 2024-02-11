import { Injectable, Signal, effect, signal } from '@angular/core';
import { Theme } from '../types/theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _theme = signal<Theme>('light');

  public get theme(): Signal<Theme> {
    return this._theme.asReadonly();
  }

  constructor() {
    effect(async () => {
      localStorage.setItem('theme', this._theme());
      document.documentElement.classList.toggle(
        'dark',
        this._theme() === 'dark'
      );
    });

    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      this._theme.set('dark');
      return;
    } else if (storedTheme === 'light') {
      return;
    }

    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    if (prefersDark) {
      this._theme.set('dark');
    }
  }

  public setTheme(theme: Theme): void {
    this._theme.set(theme);
  }
}
