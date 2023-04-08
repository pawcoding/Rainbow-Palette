import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Shade} from "../../models/shade.model";
import {NotificationService} from "../../services/notification.service";
import {PaletteScheme} from "../../class/palette-generator";
import {PaletteService} from "../../services/palette.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {getGitHubLink, getDiscordLink} from "../../utils/links.util";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  value: string
  scheme: PaletteScheme
  schemes: any
  invalid = false
  dropdown = false
  loading = false
  progress = 0

  @ViewChild('loadContainer')
  loadContainer: ElementRef<HTMLDivElement> | undefined
  @ViewChild('loadBar')
  loadBar: ElementRef<HTMLSpanElement> | undefined

  getGitHubLink = getGitHubLink(this.translate)
  getDiscordLink = getDiscordLink(this.translate)

  constructor(
    private notificationService: NotificationService,
    private paletteService: PaletteService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.value = paletteService.hex || Shade.generateRandomShade().hex.toUpperCase()
    let i = 0
    this.schemes = Object.values(PaletteScheme)
      .filter(s => s.toString().length > 1)
      .map(s => {
        return {
          index: i++,
          for: 'scheme' + s.toString()
            .replace('_', ' ')
            .replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase())
            .replace(' ', ''),
          name: s.toString(),
          scheme: s
        }
    })

    this.scheme = paletteService.scheme % this.schemes.length
  }

  ngOnInit(): void {
  }

  updateValue(value: string) {
    this.invalid = !value.match(/^#[0-9A-Fa-f]{6}$/)
    if (!this.invalid)
      this.value = value.toUpperCase()
  }

  updateScheme(scheme: PaletteScheme) {
    this.scheme = scheme
    this.dropdown = false
  }

  generatePalette() {
    if (this.invalid) {
      this.notificationService.notification.emit(this.translate.instant('home.generation.invalid-hex'))
      return
    }

    this.loading = true
    const interval = setInterval(() => {
      this.progress = (this.loadBar?.nativeElement.clientWidth || 0) / (this.loadContainer?.nativeElement.clientWidth || 100)
    }, 50)

    setTimeout(() => {
      clearInterval(interval)
      this.paletteService.generatePalette(this.value, this.scheme)
      this.router.navigate(['edit'])
    }, 5100)
  }

}
