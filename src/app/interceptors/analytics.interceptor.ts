import { MatomoRouterInterceptor } from '@ngx-matomo/router'
import { Injectable } from '@angular/core'
import { StorageService } from '../services/storage.service'
import { MatomoTracker } from '@ngx-matomo/tracker'
import { Observable } from 'rxjs'
import { NavigationEnd } from '@angular/router'

@Injectable()
export class AnalyticsInterceptor implements MatomoRouterInterceptor {
  isPWA = false

  constructor(private tracker: MatomoTracker, private storage: StorageService) {
    // Check for installed PWA
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      // eslint-disable-next-line  @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.navigator.standalone
    ) {
      this.isPWA = true
    }

    window.addEventListener('appinstalled', () => {
      this.isPWA = true
      this.tracker.trackEvent('pwa', 'installed')
    })
  }

  beforePageTrack(
    event: NavigationEnd
  ): Observable<void> | Promise<void> | void {
    this.tracker.setDocumentTitle(event.url)

    this.tracker.setCustomDimension(1, this.storage.language)
    this.tracker.setCustomDimension(2, this.storage.dark ? 'dark' : 'light')
    this.tracker.setCustomDimension(3, this.isPWA ? 'pwa' : 'web')
  }
}
