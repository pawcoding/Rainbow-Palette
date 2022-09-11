import {EventEmitter} from "@angular/core";
import {Notification} from "./notification.interface";

export class TailwindCopyNotification {

  constructor(
    private notification: EventEmitter<Notification | undefined>,
  ) { }

  getNotification(): Notification {
    const closeEmitter = new EventEmitter()
    closeEmitter.subscribe(() => {
      this.notification.emit(undefined)
    })

    const docEmitter = new EventEmitter()
    docEmitter.subscribe(() => {
      window.open('https://tailwindcss.com/docs/customizing-colors#color-object-syntax', '_blank')
    })

    return {
      message: 'The palette has been copied to your clipboard. ' +
        'To use the colors copy the contents of the clipboard to the tailwind.config.js file.\n\n' +
        'Check TailwindsCSS\'s documentation for further instructions.',
      actions: [{
        text: 'Read more',
        title: 'Open documentation',
        action: docEmitter
      }]
    }
  }

}
