import { Component } from '@angular/core';
import {Palette} from "./models/palette.model";
import {ColorConverter} from "./class/color-converter";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'tailwind-color-generator';

  palette = new Palette('Random')

  constructor() {
    const random = Math.floor(4 + Math.random() * 6)

    for (let i = 0; i < random; i++) {
      const hex = this.generateRandomHex()
      this.palette.addColor(hex, hex)
    }
  }

  generateRandomHex() {
    const hue = Math.floor(Math.random() * 360)
    const saturation = Math.floor(Math.random() * 100)
    const luminosity = Math.floor(Math.random() * 100)

    return ColorConverter.hslToRgb(hue, saturation, luminosity)
  }

}
