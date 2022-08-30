import { Component } from '@angular/core';
import {Palette} from "./models/palette.model";
import {Shade} from "./models/shade.model";
import {Color} from "./models/color.model";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'tailwind-color-generator'
  version = environment.version
  dark = false

  shade = Shade.generateRandomShade()
  color: Color | undefined
  palette = Palette.generateRandomPalette(Math.floor(5 + Math.random() * 5))

  constructor() {
    if (document.getElementById('body')?.classList.contains('dark'))
      this.dark = true
  }

}
