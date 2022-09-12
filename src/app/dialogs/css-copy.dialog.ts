import {EventEmitter} from "@angular/core";
import {Dialog} from "../interfaces/dialog.interface";
import {ToUnicodeVariantUtil} from "../utils/to-unicode-variant.util";

export class CssCopyDialog {

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
      message: 'The palette has been copied to your clipboard. ' +
        `To use the colors as CSS properties copy the contents of the clipboard to the ${ToUnicodeVariantUtil.toUnicodeVariant(':root', 'm')} of your css file. ` +
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
