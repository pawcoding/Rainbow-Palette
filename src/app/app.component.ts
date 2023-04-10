import { Component, EventEmitter, OnInit } from '@angular/core'
import { environment } from '../environments/environment'
import { StorageService } from './services/storage.service'
import { PaletteService } from './services/palette.service'
import { Router } from '@angular/router'
import { ColorNamer } from './class/color-namer'
import { TranslateService } from '@ngx-translate/core'
import { Title } from '@angular/platform-browser'
import { MatomoTracker } from '@ngx-matomo/tracker'
import { NotificationService } from './services/notification.service'
import { getMatomoLink } from './utils/links.util'
import { SwUpdate } from '@angular/service-worker'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title =
    'Rainbow Palette | Get your own color palette from just a single color'
  version = environment.version
  dark = false
  showTrackingNotice = false

  getMatomoLink = getMatomoLink(this.translate)

  navigation = [
    {
      link: '/',
      id: 'home',
      icon:
        '<path d="M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 11-9 0V4.125zm4.5 14.25a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />' +
        '<path d="M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257zM12.738 17.625l6.474-6.474a1.875 1.875 0 000-2.651L15.5 4.787a1.875 1.875 0 00-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375z" />',
    },
    {
      link: '/edit',
      id: 'edit',
      icon: '<path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />',
    },
    {
      link: '/preview',
      id: 'preview',
      icon: '<path fill-rule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 011.5 10.875v-3.75zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 01-1.875-1.875v-8.25zM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 013 18.375v-2.25z" clip-rule="evenodd" />',
    },
  ]

  constructor(
    private storage: StorageService,
    public paletteService: PaletteService,
    public router: Router,
    private translate: TranslateService,
    private titleService: Title,
    private notificationService: NotificationService,
    private tracker: MatomoTracker,
    private updates: SwUpdate
  ) {
    // Load theme from local storage and subscribe to changes
    this.dark = storage.loadTheme()
    this.storage.darkEmitter.subscribe((d) => (this.dark = d.valueOf()))

    // Load color name dictionary
    ColorNamer.loadDictionary()

    // Setup translation pipe
    this.translate.setDefaultLang('en')
    this.storage.languageEmitter.subscribe(() => {
      this.title = `Rainbow Palette | ${this.translate.instant('app.title')}`
      this.titleService.setTitle(this.title)
    })
    this.storage.loadLanguage()
  }

  ngOnInit() {
    // Setup tracking
    switch (this.storage.hasTrackingAllowed()) {
      case 1:
        // Tracking is allowed
        this.tracker.setConsentGiven()
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
    this.updates.versionUpdates.subscribe((event) => {
      if (event.type === 'VERSION_READY') {
        const closeEvent = new EventEmitter()
        closeEvent.subscribe(() => {
          this.notificationService.dialog.emit(undefined)
        })

        const updateEvent = new EventEmitter()
        updateEvent.subscribe(() => {
          // Save current palette before reload
          const palette = this.paletteService.getPalette()
          if (palette) {
            this.storage.savePalette(palette)
          }

          this.tracker.trackEvent('pwa', 'update-complete')
          document.location.reload()
        })

        this.notificationService.dialog.emit({
          id: 'update-available',
          actions: [
            {
              id: 'not-now',
              action: closeEvent,
            },
            {
              id: 'update',
              action: updateEvent,
            },
          ],
        })
      } else if (event.type === 'VERSION_INSTALLATION_FAILED') {
        this.notificationService.notification.emit('update-failed')
        this.tracker.trackEvent('pwa', 'update-failed')
      }
    })
  }

  /**
   * Allow tracking and remember the consent for 90 days
   */
  allowTracking() {
    this.showTrackingNotice = false
    this.storage.rememberTracking(true)
    this.tracker.setConsentGiven()
    this.notificationService.notification.emit('tracking-allowed')
  }

  /**
   * Disable tracking and remember the choice for 90 days
   */
  disableTracking() {
    this.showTrackingNotice = false
    this.storage.rememberTracking(false)
    this.tracker.forgetConsentGiven()
  }
}
