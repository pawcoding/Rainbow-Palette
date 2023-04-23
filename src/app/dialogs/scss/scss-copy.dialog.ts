import { EventEmitter } from '@angular/core'
import { Dialog } from '../../interfaces/dialog.interface'
import { toUnicodeVariant } from '../../utils/to-unicode-variant.util'

export class ScssCopyDialog {
  constructor(private notification: EventEmitter<Dialog | undefined>) {}

  getNotification(): Dialog {
    const closeEmitter = new EventEmitter()
    closeEmitter.subscribe(() => {
      this.notification.emit(undefined)
    })

    const docEmitter = new EventEmitter()
    docEmitter.subscribe(() => {
      window.open('https://sass-lang.com/documentation/variables', '_blank')
    })

    return {
      id: 'export-scss-copy',
      interpolateParams: {
        usage: toUnicodeVariant('color: $color-500;', 'm'),
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
