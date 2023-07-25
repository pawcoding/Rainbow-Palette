import { Component, ElementRef, ViewChild, inject } from '@angular/core'
import { Shade } from '../../models/shade.model'
import { NotificationService } from '../../services/notification.service'
import { PaletteScheme } from '../../class/palette-generator'
import { PaletteService } from '../../services/palette.service'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { getDiscordLink, getGitHubLink } from '../../utils/links.util'
import { MatomoTracker } from 'ngx-matomo-client'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly _translate = inject(TranslateService)
  private readonly _notificationService = inject(NotificationService)
  private readonly _paletteService = inject(PaletteService)
  private readonly _router = inject(Router)
  private readonly _tracker = inject(MatomoTracker)

  protected value: string
  protected scheme: PaletteScheme
  protected schemes: {
    index: number
    for: string
    name: string
    scheme: PaletteScheme
  }[]
  protected invalid = false
  protected dropdown = false
  protected loading = false
  protected progress = 0

  @ViewChild('loadContainer')
  loadContainer: ElementRef<HTMLDivElement> | undefined
  @ViewChild('loadBar')
  loadBar: ElementRef<HTMLSpanElement> | undefined

  protected getGitHubLink = getGitHubLink(this._translate)
  protected getDiscordLink = getDiscordLink(this._translate)

  constructor() {
    this.value =
      this._paletteService.latestHex() ||
      Shade.generateRandomShade().hex.toUpperCase()
    let i = 0
    this.schemes = Object.values(PaletteScheme)
      .filter((s) => s.toString().length > 1)
      .map((s) => ({
        index: i++,
        for:
          'scheme' +
          s
            .toString()
            .replace('_', ' ')
            .replace(
              /(\w)(\w*)/g,
              (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
            )
            .replace(' ', ''),
        name: s.toString(),
        scheme: s as PaletteScheme,
      }))

    this.scheme = this._paletteService.latestScheme() % this.schemes.length
  }

  protected updateValue(value: string) {
    this.invalid = !value.match(/^#[0-9A-Fa-f]{6}$/)
    if (!this.invalid) this.value = value.toUpperCase()
  }

  protected updateScheme(scheme: PaletteScheme) {
    this.scheme = scheme
    this.dropdown = false
  }

  protected generatePalette() {
    if (this.invalid) {
      this._notificationService.openNotification('invalid-hex')
      return
    }

    this._tracker.trackEvent('palette', 'generate', this.scheme.toString())

    this.loading = true
    const interval = window.setInterval(() => {
      this.progress =
        (this.loadBar?.nativeElement.clientWidth || 0) /
        (this.loadContainer?.nativeElement.clientWidth || 100)
    }, 50)

    setTimeout(async () => {
      clearInterval(interval)
      this._paletteService.generatePalette(this.value, this.scheme)
      await this._router.navigate(['edit'])
    }, 5100)
  }
}
