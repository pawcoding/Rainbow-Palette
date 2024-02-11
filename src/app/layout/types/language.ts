/**
 * The language type.
 */
export type Language = 'en' | 'de';

/**
 * A language option for the layout options.
 */
export interface LanguageOption {
  /**
   * The value of the language option.
   */
  value: Language;

  /**
   * The label of the language option.
   */
  label: string;

  /**
   * The flag of the language option.
   */
  flag: string;
}
