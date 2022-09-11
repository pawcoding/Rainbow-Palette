import {EventEmitter} from "@angular/core";
import {Notification} from "./notification.interface";

export class TailwindCopyNotification {

  constructor(
    private notification: EventEmitter<Notification | undefined>,
  ) { }

  getNotification() {
    const closeEmitter = new EventEmitter()
    closeEmitter.subscribe(() => {
      this.notification.emit(undefined)
    })

    return {
      message: 'The palette has been copied to your clipboard. ' +
        'To use the colors copy the contents of the clipboard to the tailwind.config.js file.\n\n' +
        'Check TailwindsCSS\'s documentation for further instructions.',
      actions: []
    }
  }

}
