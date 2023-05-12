import { Component } from '@angular/core'
import { StorageService } from '../../services/storage.service'
import { MatomoTracker } from 'ngx-matomo-client'
import { NotificationService } from '../../services/notification.service'
import { getMatomoLink } from '../../utils/links.util'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
})
export class AnalyticsComponent {
  getMatomoLink = getMatomoLink(this.translate)

  trackingAllowed = 2

  constructor(
    private readonly storage: StorageService,
    private readonly notificationService: NotificationService,
    private readonly translate: TranslateService,
    private readonly tracker: MatomoTracker
  ) {
    this.trackingAllowed = this.storage.hasTrackingAllowed()
  }

  /**
   * Allow tracking and remember the consent for 90 days
   */
  allowTracking() {
    this.storage.rememberTracking(true)
    this.tracker.setConsentGiven()
    this.notificationService.notification.emit('tracking-allowed')
    this.trackingAllowed = 1
  }

  /**
   * Disable tracking and remember the choice for 90 days
   */
  disableTracking() {
    this.storage.rememberTracking(false)
    this.tracker.forgetConsentGiven()
    this.trackingAllowed = 0
  }
}
