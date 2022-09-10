import {Component, EventEmitter} from '@angular/core';
import {Palette} from "./models/palette.model";
import {Shade} from "./models/shade.model";
import {Color} from "./models/color.model";
import {environment} from "../environments/environment";
import {StorageService} from "./services/storage.service";
// @ts-ignore
import {v4 as uuidv4} from "uuid";
import {ColorService} from "./services/color.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  title = 'tailwind-color-generator'
  version = environment.version
  dark

  shade: Shade = Shade.generateRandomShade()
  color: Color
  palette: Palette

  editColor = new EventEmitter<Color>()

  constructor(
    private storage: StorageService,
    public colorService: ColorService
  ) {
    // Redirect to https if server served / browser fetched with http
    if (environment.production && window.location.href.startsWith('http://'))
      window.location.href = 'https://' + window.location.href.substring(6)

    // Load theme from local storage and subscribe to changes
    this.dark = storage.loadTheme()
    storage.darkEmitter.subscribe(d => this.dark = d.valueOf())

    // Load palette if saved in local storage
    this.palette = storage.loadPalette()

    // Load random color for editor
    this.color = Color.generateRandomColor()
  }

  /**
   * Set and display a new random palette with 5 - 10 colors.
   */
  randomPalette() {
    this.palette = Palette.generateRandomPalette(Math.floor(5 + Math.random() * 5))
  }

  /**
   * Remove the current palette from logic.
   * The palette can be restored if it was saved in local storage.
   */
  removePalette() {
    this.palette = new Palette('Palette', uuidv4())
  }

  /**
   * Add color to the current palette.
   * If no palette exists, a new one is created.
   * @param color
   */
  addColor(color: Color | undefined) {
    if (color) {
      if (!this.palette)
        this.palette = new Palette('Palette', uuidv4())
      this.palette.addColor(color)
    }
  }

}
