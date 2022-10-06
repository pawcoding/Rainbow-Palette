import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Shade} from "../../models/shade.model";
import {NotificationService} from "../../services/notification.service";
import {PaletteScheme} from "../../class/palette-generator";
import {PaletteService} from "../../services/palette.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  value: string
  scheme: PaletteScheme
  schemeTitle: string
  schemes: any
  invalid = false
  dropdown = false
  loading = false
  progress = 0

  @ViewChild('loadContainer')
  loadContainer: ElementRef<HTMLDivElement> | undefined
  @ViewChild('loadBar')
  loadBar: ElementRef<HTMLSpanElement> | undefined

  constructor(
    private notificationService: NotificationService,
    private paletteService: PaletteService,
    private router: Router
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
          title: s.toString().charAt(0) + s.toString()
            .substring(1)
            .replace('_', ' ')
            .toLowerCase(),
          scheme: s
        }
    })

    this.scheme = paletteService.scheme
    this.schemeTitle = this.schemes
      .find((s: { index: PaletteScheme; }) => s.index === this.scheme)
      .title
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
    const index = Object.values(PaletteScheme).indexOf(scheme) % 8
    this.schemeTitle = this.schemes
      .find((s: { index: PaletteScheme; }) => s.index === index)
      .title
    this.dropdown = false
  }

  generatePalette() {
    if (this.invalid) {
      this.notificationService.notification.emit('You need to enter a 6-digit hex code.')
      return
    }

    this.loading = true
    this.paletteService.generatePalette(this.value, this.scheme)

    const interval = setInterval(() => {
      this.progress = Math.round(100 * (this.loadBar?.nativeElement.clientWidth || 0) / (this.loadContainer?.nativeElement.clientWidth || 100))
    }, 50)

    setTimeout(() => {
      clearInterval(interval)
      this.router.navigate(['edit'])
    }, 5100)
  }

}
