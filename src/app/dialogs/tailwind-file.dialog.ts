import {EventEmitter} from "@angular/core";
import {Dialog} from "../interfaces/dialog.interface";
import {ToUnicodeVariantUtil} from "../utils/to-unicode-variant.util";

export class TailwindFileDialog {

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
      window.open('https://tailwindcss.com/docs/customizing-colors#using-the-default-colors', '_blank')
    })

    return {
      message: 'Move the downloaded tailwind.colors.js file to the root of your project. ' +
        `Then import the colors in your ${ToUnicodeVariantUtil.toUnicodeVariant('tailwind.config.js', 'm')} file like:\n` +
        ToUnicodeVariantUtil.toUnicodeVariant('colors: require(\'./tailwind.colors\'),', 'm') + '\n\n' +
        'Check TailwindsCSS\'s documentation for further instructions.',
      actions: [{
        text: 'Read more',
        title: 'Open documentation',
        action: docEmitter
      }]
    }
  }

}
