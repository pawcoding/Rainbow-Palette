import {EventEmitter, Injectable} from '@angular/core';
import {Palette} from "../models/palette.model";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  darkEmitter = new EventEmitter<Boolean>()

  constructor() { }

  /**
   * Load the theme if it is stored in local storage.
   * If no theme was saved, the browser default theme is used.
   */
  loadTheme() {
    if (!localStorage.getItem('theme')) {
      if (window.matchMedia('(prefers-color-scheme: dark)'))
        return this.toggleTheme(true)
      else {
        this.darkEmitter.emit(true)
        return false
      }
    } else {
      return this.toggleTheme(localStorage.getItem('theme') === 'dark')
    }
  }

  /**
   * Toggle between dark and light theme.
   * Force dark or light mode with parameter.
   * @param dark
   */
  toggleTheme(dark: boolean | undefined) {
    document.body.classList.toggle('dark', dark)

    dark = document.body.classList.contains('dark')
    localStorage.setItem('theme', dark ? 'dark' : 'light')

    this.darkEmitter.emit(dark)

    return dark
  }

  /**
   * Load the palette saved in local storage.
   */
  loadPalette(): Palette {
    const stored = localStorage.getItem('palette')
    if (stored) {
      try {
        return Palette.parsePalette(JSON.parse(stored))
      } catch (e) {
        console.error(e)
      }
    }
    return Palette.generateRandomPalette(Math.floor(5 + Math.random() * 5))
  }

  /**
   * Save palette in local storage.
   * @param palette
   */
  savePalette(palette: Palette) {
    localStorage.setItem('palette', palette.toString())
  }

}
