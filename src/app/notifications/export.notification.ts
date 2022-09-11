import {EventEmitter} from "@angular/core";
import {CssNotification} from "./css.notification";
import {Palette} from "../models/palette.model";
import {Notification} from "./notification.interface";
import {TailwindNotification} from "./tailwind.notification";

export class ExportNotification {

  constructor(
    private notification: EventEmitter<Notification | undefined>,
    private palette: Palette
  ) { }

  getNotification() {
    const cssEmitter = new EventEmitter()
    cssEmitter.subscribe(() => {
      this.notification
        .emit(new CssNotification(
          this.notification,
          this.palette
        ).getNotification())
    })

    const tailwindEmitter = new EventEmitter()
    tailwindEmitter.subscribe(() => {
      this.notification
        .emit(new TailwindNotification(
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
