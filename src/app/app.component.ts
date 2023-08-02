import { Component, OnInit, effect, inject } from '@angular/core'
import { environment } from '../environments/environment'
import { StorageService } from './services/storage.service'
import { PaletteService } from './services/palette.service'
import { Router } from '@angular/router'
import { ColorNamer } from './class/color-namer'
import { TranslateService } from '@ngx-translate/core'
import { Title } from '@angular/platform-browser'
import { MatomoTracker } from 'ngx-matomo-client'
import { NotificationService } from './services/notification.service'
import { getMatomoLink } from './utils/links.util'
import { SwUpdate } from '@angular/service-worker'
import { DialogService } from './services/dialog.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private readonly _translate = inject(TranslateService)
  private readonly _storage = inject(StorageService)
  private readonly _notificationService = inject(NotificationService)
  private readonly _dialogService = inject(DialogService)
  private readonly _tracker = inject(MatomoTracker)
  private readonly _titleService = inject(Title)
  private readonly _updates = inject(SwUpdate)
  protected readonly router = inject(Router)
  protected readonly paletteService = inject(PaletteService)

  public title =
    'Rainbow Palette | Get your own color palette from just a single color'
  protected readonly version = environment.version
  protected readonly dark = this._storage.dark
  protected showTrackingNotice = false

  protected getMatomoLink = getMatomoLink(this._translate)

  protected navigation = [
    {
      link: '/',
      id: 'home',
      icon: 'heroSwatchSolid',
    },
    {
      link: '/edit',
      id: 'edit',
      icon: 'heroAdjustmentsHorizontalSolid',
    },
    {
      link: '/preview',
      id: 'preview',
      icon: 'heroRectangleGroupSolid',
    },
  ]

  constructor() {
    // Load color name dictionary
    ColorNamer.loadDictionary()

    // Setup translation pipe
    this._translate.setDefaultLang('en')
    effect(() => {
      this._storage.language()
      this._translate.get('app.title').subscribe((title) => {
        this.title = `Rainbow Palette | ${title}`
        this._titleService.setTitle(this.title)
      })
    })
  }

  public ngOnInit() {
    // Setup tracking
    switch (this._storage.hasTrackingAllowed()) {
      case 1:
        // Tracking is allowed
        this._tracker.setConsentGiven()
        break
      case 2:
        // No preference given yet
        this.showTrackingNotice = true
        break
      default:
        // Tracking is disallowed
        break
    }

    // Setup Service Worker update
    this._updates.versionUpdates.subscribe((event) => {
      if (event.type === 'VERSION_READY') {
        this._dialogService.openDialog({
          id: 'update-available',
          actions: [
            {
              id: 'not-now',
            },
            {
              id: 'update',
              callback: async () => {
                // Save current palette before reload
                const palette = this.paletteService.palette()
                if (palette) {
                  this._storage.savePalette(palette)
                }

                this._tracker.trackEvent('pwa', 'update-complete')
                document.location.reload()

                return undefined
              },
            },
          ],
        })
      } else if (event.type === 'VERSION_INSTALLATION_FAILED') {
        this._notificationService.openNotification('update-failed')
        this._tracker.trackEvent('pwa', 'update-failed')
      }
    })
  }

  /**
   * Allow tracking and remember the consent for 90 days
   */
  protected allowTracking() {
    this.showTrackingNotice = false
    this._storage.rememberTracking(true)
    this._tracker.setConsentGiven()
    this._notificationService.openNotification('tracking-allowed')
  }

  /**
   * Disable tracking and remember the choice for 90 days
   */
  protected disableTracking() {
    this.showTrackingNotice = false
    this._storage.rememberTracking(false)
    this._tracker.forgetConsentGiven()
  }
}
