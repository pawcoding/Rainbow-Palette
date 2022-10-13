import {Component} from '@angular/core';
import {environment} from "../environments/environment";
import {StorageService} from "./services/storage.service";
import {ColorService} from "./services/color.service";
import {PaletteService} from "./services/palette.service";
import {Router} from "@angular/router";
import {ColorNamer} from "./class/color-namer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  title = 'tailwind-color-generator'
  version = environment.version
  dark

  navigation = [{
    link: '/',
    title: 'Generate a new palette',
    text: 'Regenerate',
    icon: '<path fill="currentColor" d="M21.85 44q-1.2 0-2.1-.875-.9-.875-.9-2.125V31H11q-1.2 0-2.1-.9Q8 29.2 8 28V12.85q0-2.75 1.975-4.8T14.75 6H40v22q0 1.2-.9 2.1-.9.9-2.1.9h-7.85v10q0 1.25-.9 2.125t-2.1.875ZM11 20.3h26V9h-2.8v7.05q0 .65-.425 1.075-.425.425-1.075.425-.65 0-1.075-.425-.425-.425-.425-1.075V9h-3.55v2.75q0 .65-.425 1.075-.425.425-1.075.425-.65 0-1.075-.425-.425-.425-.425-1.075V9h-9.9q-1.6 0-2.675 1.15Q11 11.3 11 12.85Zm0 7.7h26v-4.7H11V28Zm0-4.7V28Z"/>',
  }, {
    link: '/edit',
    title: 'Edit your palette',
    text: 'Edit',
    icon: '<path fill="currentColor" d="M7.2 39.05q-.85 0-1.45-.6t-.6-1.5q0-.85.6-1.45t1.45-.6h9.35q.85 0 1.475.6.625.6.625 1.5 0 .85-.625 1.45t-1.475.6Zm0-25.95q-.85 0-1.45-.6t-.6-1.5q0-.85.6-1.45t1.45-.6h17.65q.85 0 1.475.6.625.6.625 1.5 0 .85-.625 1.45t-1.475.6Zm15.95 30.05q-.85 0-1.475-.6-.625-.6-.625-1.5V32.8q0-.85.625-1.45t1.475-.6q.85 0 1.45.6t.6 1.45v2.1h15.6q.85 0 1.45.6t.6 1.5q0 .85-.6 1.45t-1.45.6H25.2v2q0 .9-.6 1.5t-1.45.6Zm-6.6-13q-.85 0-1.45-.6t-.6-1.45v-2.05H7.2q-.85 0-1.45-.6T5.15 24q0-.85.6-1.45t1.45-.6h7.3V19.8q0-.85.6-1.45t1.45-.6q.85 0 1.475.6.625.6.625 1.45v8.3q0 .85-.625 1.45t-1.475.6Zm6.6-4.1q-.85 0-1.475-.6-.625-.6-.625-1.45t.625-1.45q.625-.6 1.475-.6H40.8q.85 0 1.45.6t.6 1.45q0 .85-.6 1.45t-1.45.6Zm8.3-8.8q-.85 0-1.475-.6-.625-.6-.625-1.45V6.95q0-.9.625-1.5t1.475-.6q.85 0 1.45.6t.6 1.5v2h7.3q.85 0 1.45.6t.6 1.5q0 .85-.6 1.45t-1.45.6h-7.3v2.1q0 .85-.6 1.45t-1.45.6Z"/>',
  }, {
    link: '/preview',
    title: 'Preview your palette with components',
    text: 'Preview',
    icon: '<path fill="currentColor" d="M11 37h12v-9H11Zm0-11h12V11H11Zm14 11h12V22H25Zm0-17h12v-9H25ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v3h3v3h-3v7.5h3v3h-3V33h3v3h-3v3q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30ZM9 9v30V9Z"/>',
  }]

  constructor(
    private storage: StorageService,
    public colorService: ColorService,
    public paletteService: PaletteService,
    public router: Router
  ) {
    // Load theme from local storage and subscribe to changes
    this.dark = storage.loadTheme()
    storage.darkEmitter.subscribe(d => this.dark = d.valueOf())

    ColorNamer.loadDictionary()
  }

}
