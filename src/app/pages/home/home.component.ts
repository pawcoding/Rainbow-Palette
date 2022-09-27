import { Component, OnInit } from '@angular/core';
import {Shade} from "../../models/shade.model";
import {NotificationService} from "../../services/notification.service";
import {PaletteScheme} from "../../class/palette-generator";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  value: string
  schemes: any
  invalid = false
  dropdown = false

  constructor(
    private notificationService: NotificationService
  ) {
    this.value = Shade.generateRandomShade().hex.toUpperCase()
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
            .toLowerCase()
        }
    })
  }

  ngOnInit(): void {
  }

  updateValue(value: string) {
    this.value = value.toUpperCase()
    this.invalid = !this.value.match(/^#[0-9A-Fa-f]{6}$/)
  }

  generatePalette() {
    if (this.invalid)
      this.notificationService.notification.emit('You need to enter a 6-digit hex code.')
    else
      this.notificationService.notification.emit('Generate palette')
  }

}
