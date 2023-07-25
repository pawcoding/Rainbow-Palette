import { Component, inject } from '@angular/core'
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
  private readonly _translate = inject(TranslateService)
  private readonly _storage = inject(StorageService)
  private readonly _notificationService = inject(NotificationService)
  private readonly _tracker = inject(MatomoTracker)

  protected readonly getMatomoLink = getMatomoLink(this._translate)

  protected trackingAllowed = 2

  constructor() {
    this.trackingAllowed = this._storage.hasTrackingAllowed()
  }

  /**
   * Allow tracking and remember the consent for 90 days
   */
  protected allowTracking() {
    this._storage.rememberTracking(true)
    this._tracker.setConsentGiven()
    this._notificationService.openNotification('tracking-allowed')
    this.trackingAllowed = 1
  }

  /**
   * Disable tracking and remember the choice for 90 days
   */
  protected disableTracking() {
    this._storage.rememberTracking(false)
    this._tracker.forgetConsentGiven()
    this.trackingAllowed = 0
  }
}
