import { EventEmitter } from '@angular/core'
import { Dialog } from '../../interfaces/dialog.interface'
import { toUnicodeVariant } from '../../utils/to-unicode-variant.util'

export class ScssFileDialog {
  constructor(private notification: EventEmitter<Dialog | undefined>) {}

  getNotification(): Dialog {
    const closeEmitter = new EventEmitter()
    closeEmitter.subscribe(() => {
      this.notification.emit(undefined)
    })

    const docEmitter = new EventEmitter()
    docEmitter.subscribe(() => {
      window.open('https://sass-lang.com/documentation/at-rules/use', '_blank')
    })

    return {
      id: 'export-scss-file',
      interpolateParams: {
        file: toUnicodeVariant('_colors.scss', 'm'),
        link: toUnicodeVariant("@use 'colors'", 'm'),
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
