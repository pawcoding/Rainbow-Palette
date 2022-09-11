import {EventEmitter} from "@angular/core";
import {Notification} from "./notification.interface";

export class CssFileNotification {

  constructor(
    private notification: EventEmitter<Notification | undefined>,
  ) { }

  getNotification() {
    const closeEmitter = new EventEmitter()
    closeEmitter.subscribe(() => {
      this.notification.emit(undefined)
    })

    return {
      message: 'Move the downloaded colors.css file to the root of your webserver. ' +
        'Then link it in the head of your html file like\n\n' +
        '<link rel="stylesheet" href="/colors.css">\n\n' +
        'Now you can use them by referencing them like:\n\n' +
        'color: var(--color-100);',
      actions: []
    }
  }

}
