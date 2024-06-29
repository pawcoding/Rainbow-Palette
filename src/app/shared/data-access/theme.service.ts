import { Injectable, computed, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, map } from 'rxjs';
import { LocalStorageKey } from '../enums/local-storage-keys';
import { Theme } from '../types/theme';

const THEME_QUERY_LIST = matchMedia('(prefers-color-scheme: dark)');

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  /**
   * Internal signal to store the current theme.
   */
  private readonly _theme = signal<Theme>('auto');
  /**
   * Internal flag that reflects the user's preference for dark mode.
   * This is set in the settings of the operating system or browser and is used when the theme is set to `auto`.
   *
   * We also listen to changes to this flag to update the theme when the user changes their preference in real-time.
   */
  private readonly _prefersDark = toSignal(
    fromEvent<MediaQueryListEvent>(THEME_QUERY_LIST, 'change').pipe(map((event) => event.matches)),
    {
      initialValue: THEME_QUERY_LIST.matches
    }
  );

  /**
   * Flag that indicates whether the current theme is dark.
   */
  public readonly isDark = computed(() => {
    const theme = this._theme();

    if (theme === 'auto') {
      return this._prefersDark();
    }

    return theme === 'dark';
  });

  /**
   * Current theme.
   */
  public readonly theme = this._theme.asReadonly();

  public constructor() {
    // Store the current theme in local storage.
    effect(() => {
      localStorage.setItem(LocalStorageKey.THEME, this._theme());
    });

    // Add / remove the 'dark' class based on the current theme.
    effect(() => {
      document.documentElement.classList.toggle('dark', this.isDark());
    });

    // Read the last selected theme from local storage.
    const storedTheme = localStorage.getItem(LocalStorageKey.THEME);
    if (storedTheme === 'dark') {
      this._theme.set('dark');
    } else if (storedTheme === 'light') {
      this._theme.set('light');
    } else {
      this._theme.set('auto');
    }
  }

  /**
   * Set the current theme.
   */
  public setTheme(theme: Theme): void {
    this._theme.set(theme);
  }
}

export class ThemeServiceMock {
  public readonly theme = signal<Theme>('light').asReadonly();
  public readonly isDark = computed(() => this.theme() === 'dark');
  public setTheme(_theme: Theme): void {}
}
