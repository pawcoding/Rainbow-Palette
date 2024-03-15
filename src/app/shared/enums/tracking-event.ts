/**
 * Tracking event categories for Matomo
 */
export enum TrackingEventCategory {
  /**
   * Analytics events were disabled.
   */
  EVENTS_DISABLED = 'EVENTS_DISABLED',
  /**
   * Analytics events were triggered while the user was offline.
   */
  EVENTS_OFFLINE = 'EVENTS_OFFLINE',
  /**
   * User exports a palette.
   */
  EXPORT_PALETTE = 'EXPORT_PALETTE',
  /**
   * User generates a palette.
   */
  GENERATE_PALETTE = 'GENERATE_PALETTE',
  /**
   * PWA events
   */
  PWA = 'PWA',
  /**
   * User saves a palette.
   */
  SAVE_PALETTE = 'SAVE_PALETTE',
  /**
   * Test category
   * This is only used for testing purposes.
   */
  TEST = 'TEST_CATEGORY',
}

/**
 * Tracking event actions for Matomo
 */
export enum TrackingEventAction {
  /**
   * Analytics events were disabled.
   */
  EVENTS_DISABLED = 'EVENTS_DISABLED',
  /**
   * Analytics events were triggered while the user was offline.
   */
  EVENTS_OFFLINE = 'EVENTS_OFFLINE',
  /**
   * User copies the palette to the clipboard.
   */
  EXPORT_PALETTE_COPY = 'EXPORT_PALETTE_COPY',
  /**
   * User exports the palette to a file.
   */
  EXPORT_PALETTE_FILE = 'EXPORT_PALETTE_FILE',
  /**
   * User requests a new palette export format.
   */
  EXPORT_PALETTE_REQUEST_FORMAT = 'EXPORT_PALETTE_REQUEST_FORMAT',
  /**
   * User generates a palette.
   */
  GENERATE_PALETTE = 'GENERATE_PALETTE',
  /**
   * User installs the website as a PWA.
   */
  PWA_INSTALL = 'PWA_INSTALL',
  /**
   * User updates the PWA.
   */
  PWA_UPDATE_COMPLETED = 'PWA_UPDATE_COMPLETED',
  /**
   * PWA update failed
   */
  PWA_UPDATE_FAILED = 'PWA_UPDATE_FAILED',
  /**
   * User saves a palette to local storage.
   */
  SAVE_PALETTE_LOCAL_STORAGE = 'SAVE_PALETTE_LOCAL_STORAGE',
  /**
   * Test action
   * This is only used for testing purposes.
   */
  TEST = 'TEST_ACTION',
}

/**
 * Tracking event names for Matomo
 */
export enum TrackingEventName {
  /**
   * User exports the palette to CSS.
   */
  EXPORT_PALETTE_CSS = 'EXPORT_PALETTE_CSS',
  /**
   * User exports the palette to LESS.
   */
  EXPORT_PALETTE_LESS = 'EXPORT_PALETTE_LESS',
  /**
   * User exports the palette to SCSS.
   */
  EXPORT_PALETTE_SCSS = 'EXPORT_PALETTE_SCSS',
  /**
   * User exports the palette to Tailwind CSS.
   */
  EXPORT_PALETTE_TAILWIND = 'EXPORT_PALETTE_TAILWIND',
  /**
   * User exports the palette to an unknown format.
   * This should never happen.
   */
  EXPORT_PALETTE_UNKNOWN = 'EXPORT_PALETTE_UNKNOWN',
  /**
   * User generates an analogous palette.
   */
  GENERATE_PALETTE_ANALOGOUS = 'GENERATE_PALETTE_ANALOGOUS',
  /**
   * User generates a complementary palette.
   */
  GENERATE_PALETTE_COMPLEMENTARY = 'GENERATE_PALETTE_COMPLEMENTARY',
  /**
   * User generates a monochrome palette.
   */
  GENERATE_PALETTE_MONOCHROME = 'GENERATE_PALETTE_MONOCHROME',
  /**
   * User generates a palette with rainbow colors.
   */
  GENERATE_PALETTE_RAINBOW = 'GENERATE_PALETTE_RAINBOW',
  /**
   * User generates a palette with split complementary colors.
   */
  GENERATE_PALETTE_SPLIT_COMPLEMENTARY = 'GENERATE_PALETTE_SPLIT_COMPLEMENTARY',
  /**
   * User generates a palette with square colors.
   */
  GENERATE_PALETTE_SQUARE = 'GENERATE_PALETTE_SQUARE',
  /**
   * User generates a surprise palette.
   */
  GENERATE_PALETTE_SURPRISE = 'GENERATE_PALETTE_SURPRISE',
  /**
   * User generates a tetradic palette.
   */
  GENERATE_PALETTE_TETRADIC = 'GENERATE_PALETTE_TETRADIC',
  /**
   * User generates a triadic palette.
   */
  GENERATE_PALETTE_TRIADIC = 'GENERATE_PALETTE_TRIADIC',
  /**
   * User generates a palette with an unknown scheme.
   * This should never happen.
   */
  GENERATE_PALETTE_UNKNOWN = 'GENERATE_PALETTE_UNKNOWN',
  /**
   * Test name
   * This is only used for testing purposes.
   */
  TEST = 'TEST_NAME',
}
