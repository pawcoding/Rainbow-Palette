import {EventEmitter} from "@angular/core";
import {Dialog} from "../interfaces/dialog.interface";
import {ToUnicodeVariantUtil} from "../utils/to-unicode-variant.util";

export class TailwindCopyDialog {

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
      window.open('https://tailwindcss.com/docs/customizing-colors#color-object-syntax', '_blank')
    })

    return {
      message: 'The palette has been copied to your clipboard. ' +
        `To use the colors copy the contents of the clipboard to the ${ToUnicodeVariantUtil.toUnicodeVariant('tailwind.config.js', 'm')} file.\n\n` +
        'Check TailwindsCSS\'s documentation for further instructions.',
      actions: [{
        text: 'Read more',
        title: 'Open documentation',
        action: docEmitter
      }]
    }
  }

}
