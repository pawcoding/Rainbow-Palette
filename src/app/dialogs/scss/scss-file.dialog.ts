import { Dialog } from '../../interfaces/dialog.interface'
import { toUnicodeVariant } from '../../utils/to-unicode-variant.util'

export class ScssFileDialog {
  static getNotification(): Dialog {
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
          callback: async () => {
            window.open(
              'https://sass-lang.com/documentation/at-rules/use',
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
