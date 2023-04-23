import { EventEmitter } from '@angular/core'
import { Dialog } from '../../interfaces/dialog.interface'
import { toUnicodeVariant } from '../../utils/to-unicode-variant.util'

export class CssFileDialog {
  constructor(private notification: EventEmitter<Dialog | undefined>) {}

  getNotification(): Dialog {
    const closeEmitter = new EventEmitter()
    closeEmitter.subscribe(() => {
      this.notification.emit(undefined)
    })

    const docEmitter = new EventEmitter()
    docEmitter.subscribe(() => {
      window.open(
        'https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties#using_the_root_pseudo-class',
        '_blank'
      )
    })

    return {
      id: 'export-css-file',
      interpolateParams: {
        file: toUnicodeVariant('colors.css', 'm'),
        link: toUnicodeVariant(
          '<link rel="stylesheet" href="/colors.css">',
          'm'
        ),
        usage: toUnicodeVariant('color: var(--color-100);', 'm'),
      },
      actions: [
        {
          id: 'more',
          action: docEmitter,
        },
      ],
      style: {
        width: 'large',
      },
    }
  }
}
