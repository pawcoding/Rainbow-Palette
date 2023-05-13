import { Dialog } from 'src/app/types/dialog.type'
import { toUnicodeVariant } from '../../utils/to-unicode-variant.util'

export class ScssCopyDialog {
  static getNotification(): Dialog {
    return {
      id: 'export-scss-copy',
      interpolateParams: {
        usage: toUnicodeVariant('color: $color-500;', 'm'),
      },
      actions: [
        {
          id: 'more',
          callback: async () => {
            window.open(
              'https://sass-lang.com/documentation/variables',
              '_blank'
            )
            return undefined
          },
        },
      ],
      style: {
        width: 'large',
      },
    }
  }
}
