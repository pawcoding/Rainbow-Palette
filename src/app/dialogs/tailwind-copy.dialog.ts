import { EventEmitter } from '@angular/core'
import { Dialog } from '../interfaces/dialog.interface'
import { toUnicodeVariant } from '../utils/to-unicode-variant.util'

export class TailwindCopyDialog {
  constructor(private notification: EventEmitter<Dialog | undefined>) {}

  getNotification(): Dialog {
    const closeEmitter = new EventEmitter()
    closeEmitter.subscribe(() => {
      this.notification.emit(undefined)
    })

    const docEmitter = new EventEmitter()
    docEmitter.subscribe(() => {
      window.open(
        'https://tailwindcss.com/docs/customizing-colors#color-object-syntax',
        '_blank'
      )
    })

    return {
      id: 'export-tailwind-copy',
      interpolateParams: {
        config: toUnicodeVariant('tailwind.config.js', 'm'),
      },
      actions: [
        {
          id: 'more',
          action: docEmitter,
        },
      ],
    }
  }
}
