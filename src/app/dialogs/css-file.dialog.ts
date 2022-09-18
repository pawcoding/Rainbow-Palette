import {EventEmitter} from "@angular/core";
import {Dialog} from "../interfaces/dialog.interface";
import {ToUnicodeVariantUtil} from "../utils/to-unicode-variant.util";

export class CssFileDialog {

  constructor(
    private notification: EventEmitter<Dialog | undefined>,
  ) { }

  getNotification(): Dialog {
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
        'Then link it in the head of your html file like:\n' +
        ToUnicodeVariantUtil.toUnicodeVariant('<link rel="stylesheet" href="/colors.css">', 'm') + '\n\n' +
        'Now you can use them by referencing them like:\n' +
        ToUnicodeVariantUtil.toUnicodeVariant('color: var(--color-100);', 'm'),
      actions: [{
        text: 'Read more',
        title: 'Open MDN Web Docs',
        action: docEmitter
      }]
    }
  }

}
