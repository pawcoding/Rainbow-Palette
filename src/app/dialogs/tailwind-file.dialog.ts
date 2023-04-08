import {EventEmitter} from "@angular/core";
import {Dialog} from "../interfaces/dialog.interface";
import { toUnicodeVariant } from "../utils/to-unicode-variant.util";

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
      id: 'export-tailwind-file',
      interpolateParams: {
        file: toUnicodeVariant('tailwind.colors.js', 'm'),
        config: toUnicodeVariant('tailwind.config.js', 'm'),
        'import': toUnicodeVariant('colors: require(\'./tailwind.colors\'),', 'm')
      },
      actions: [{
        id: 'more',
        action: docEmitter
      }]
    }
  }

}
