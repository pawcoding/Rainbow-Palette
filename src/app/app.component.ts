import { Component } from '@angular/core';
import {Palette} from "./models/palette.model";
import {Shade} from "./models/shade.model";
import {Color} from "./models/color.model";
import {environment} from "../environments/environment";
import {StorageService} from "./services/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'tailwind-color-generator'
  version = environment.version
  dark

  shade = Shade.generateRandomShade()
  color: Color | undefined
  palette = Palette.generateRandomPalette(Math.floor(5 + Math.random() * 5))

  constructor(
    private storage: StorageService
  ) {
    this.dark = storage.loadTheme()
    storage.darkEmitter.subscribe(d => this.dark = d.valueOf())
  }

}
