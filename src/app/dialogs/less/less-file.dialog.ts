import { Dialog } from 'src/app/types/dialog.type'
import { toUnicodeVariant } from '../../utils/to-unicode-variant.util'

export class LessFileDialog {
  static getNotification(): Dialog {
    return {
      id: 'export-less-file',
      interpolateParams: {
        file: toUnicodeVariant('colors.less', 'm'),
        link: toUnicodeVariant("@import 'colors.less'", 'm'),
        usage: toUnicodeVariant('color: @color-500;', 'm'),
      },
      actions: [
        {
          id: 'more',
          callback: async () => {
            window.open(
              'https://lesscss.org/features/#import-atrules-feature',
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
