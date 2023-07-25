import { Injectable, effect, inject } from '@angular/core'
import { StorageService } from '../services/storage.service'
import { MatomoTracker, MatomoRouterInterceptor } from 'ngx-matomo-client'
import { Observable } from 'rxjs'
import { NavigationEnd } from '@angular/router'

@Injectable()
export class AnalyticsInterceptor implements MatomoRouterInterceptor {
  private readonly _tracker = inject(MatomoTracker)
  private readonly _storage = inject(StorageService)

  isPWA = false

  constructor() {
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
      this._tracker.trackEvent('pwa', 'installed')
    })

    let lastDark = this._storage.dark()

    // track changes in settings
    effect(() => {
      if (this._storage.dark() !== lastDark) {
        lastDark = this._storage.dark()
        this._tracker.trackPageView()
      }
    })
  }

  beforePageTrack(
    event: NavigationEnd
  ): Observable<void> | Promise<void> | void {
    this._tracker.setDocumentTitle(event.url)

    this._tracker.setCustomDimension(1, this._storage.language())
    this._tracker.setCustomDimension(2, this._storage.dark() ? 'dark' : 'light')
    this._tracker.setCustomDimension(3, this.isPWA ? 'pwa' : 'web')
  }
}
