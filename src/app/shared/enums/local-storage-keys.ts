/**
 * Keys used to store data in local storage
 */
export enum LocalStorageKey {
  /**
   * Store analytics consent status.
   */
  ANALYTICS = 'RP_ANALYTICS',
  /**
   * Store a list of events that were triggered while analytics was disabled.
   */
  EVENTS_DISABLED = 'RP_EVENTS_DISABLED',
  /**
   * Store a list of events that were triggered while the user was offline.
   */
  EVENTS_OFFLINE = 'RP_EVENTS_OFFLINE',
  /**
   * Store the settings used for the last palette generation.
   */
  LAST_GENERATION_SETTINGS = 'RP_LAST_GENERATION_SETTINGS',
  /**
   * Store the language selected by the user.
   */
  LANGUAGE = 'RP_LANGUAGE',
  /**
   * Store the user's palette.
   */
  PALETTE = 'RP_PALETTE',
  /**
   * Temporarily store the user's palette while the app updates itself.
   */
  PALETTE_TMP = 'RP_PALETTE_TMP',
  /**
   * Store the theme selected by the user.
   */
  THEME = 'RP_THEME',
  /**
   * Flag to indicate if the app is currently updating.
   */
  UPGRADING = 'RP_UPGRADING',
  /**
   * Store the user's ID used for analytics.
   */
  USER_ID = 'RP_USER_ID'
}
