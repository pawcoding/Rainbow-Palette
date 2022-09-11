import {EventEmitter} from "@angular/core";
import {Notification} from "./notification.interface";

export class TailwindFileNotification {

  constructor(
    private notification: EventEmitter<Notification | undefined>,
  ) { }

  getNotification() {
    const closeEmitter = new EventEmitter()
    closeEmitter.subscribe(() => {
      this.notification.emit(undefined)
    })

    return {
      message: 'Move the downloaded tailwind.colors.js file to the root of your project. ' +
        'Then import the colors in your tailwind.config.js file like:\n\n' +
        'colors: require(\'./tailwind.colors\')\n\n' +
        'Check TailwindsCSS\'s documentation for further instructions.',
      actions: []
    }
  }

}
