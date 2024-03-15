/**
 * Tracking goals for Matomo
 */
export enum TrackingGoal {
  /**
   * User exports a palette.
   */
  EXPORT_PALETTE = 1,
  /**
   * User visits the GitHub repository.
   */
  VISIT_GITHUB = 2,
  /**
   * User installs the website as a PWA.
   */
  INSTALL_PWA = 4,
  /**
   * User generates a palette.
   */
  GENERATE_PALETTE = 5,
  /**
   * User saves a palette.
   */
  SAVE_PALETTE = 6,
}
