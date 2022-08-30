import {EventEmitter, Injectable} from '@angular/core';

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

}
