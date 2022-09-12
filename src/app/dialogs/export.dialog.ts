import {EventEmitter} from "@angular/core";
import {Palette} from "../models/palette.model";
import {Dialog} from "../interfaces/dialog.interface";
import {CssDialog} from "./css.dialog";
import {TailwindDialog} from "./tailwind.dialog";

export class ExportDialog {

  constructor(
    private notification: EventEmitter<Dialog | undefined>,
    private palette: Palette
  ) { }

  getNotification() {
    const cssEmitter = new EventEmitter()
    cssEmitter.subscribe(() => {
      this.notification
        .emit(new CssDialog(
          this.notification,
          this.palette
        ).getNotification())
    })

    const tailwindEmitter = new EventEmitter()
    tailwindEmitter.subscribe(() => {
      this.notification
        .emit(new TailwindDialog(
          this.notification,
          this.palette
        ).getNotification())
    })

    return {
      message: 'How do you want to use the palette?',
      actions: [{
        text: 'CSS',
        title: 'CSS Properties',
        action: cssEmitter
      }, {
        text: 'TailwindCSS',
        title: 'TailwindCSS custom colors',
        action: tailwindEmitter
      }]
    }
  }

}
