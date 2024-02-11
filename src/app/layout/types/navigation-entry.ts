import { IconType } from '@ng-icons/core';

/**
 * A navigation entry for the layout navigation.
 */
export interface NavigationEntry {
  /**
   * The title of the navigation entry.
   * This can also be a translation key.
   */
  title: string;

  /**
   * The path to navigate to.
   */
  path: string;

  /**
   * The icon to display next to the title.
   * This has to be an icon from an `@ng-icons` integration.
   */
  icon: IconType;

  /**
   * The description of the navigation entry.
   * This can also be a translation key.
   * This is shown as a tooltip on hover.
   */
  description: string;
}
