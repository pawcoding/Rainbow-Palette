import {EventEmitter} from "@angular/core";
import {Notification} from "./notification.interface";

export class CssCopyNotification {

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
        'To use the colors as CSS properties copy the contents of the clipboard to the :root of your css file. ' +
        'Now you can use them by referencing them like:\n\n' +
        'color: var(--color-100);',
      actions: []
    }
  }

}
