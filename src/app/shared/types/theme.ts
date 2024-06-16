import { IconType } from '@ng-icons/core';

/**
 * A theme type.
 */
export type Theme = 'auto' | 'light' | 'dark';

/**
 * A theme option for the layout options.
 */
export interface ThemeOption {
  /*
   * The value of the theme option.
   */
  value: Theme;

  /**
   * The label of the theme option.
   */
  label: string;

  /**
   * The icon of the theme option.
   */
  icon: IconType;
}
