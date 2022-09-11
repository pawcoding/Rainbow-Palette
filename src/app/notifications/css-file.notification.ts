import {EventEmitter} from "@angular/core";
import {Notification} from "./notification.interface";

export class CssFileNotification {

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
      window.open('https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties#using_the_root_pseudo-class', '_blank')
    })

    return {
      message: 'Move the downloaded colors.css file to the root of your webserver. ' +
        'Then link it in the head of your html file like\n\n' +
        '<link rel="stylesheet" href="/colors.css">\n\n' +
        'Now you can use them by referencing them like:\n\n' +
        'color: var(--color-100);',
      actions: [{
        text: 'Read more',
        title: 'Open MDN Web Docs',
        action: docEmitter
      }]
    }
  }

}
