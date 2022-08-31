import {EventEmitter, Injectable} from '@angular/core';
import {Palette} from "../models/palette.model";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  darkEmitter = new EventEmitter<Boolean>()

  constructor() { }

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

  toggleTheme(dark: boolean | undefined) {
    document.body.classList.toggle('dark', dark)

    dark = document.body.classList.contains('dark')
    localStorage.setItem('theme', dark ? 'dark' : 'light')

    this.darkEmitter.emit(dark)

    return dark
  }

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

  savePalette(palette: Palette) {
    localStorage.setItem('palette', palette.toString())
  }

}
