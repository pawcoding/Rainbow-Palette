import { Dialog } from 'src/app/types/dialog.type'
import { toUnicodeVariant } from '../../utils/to-unicode-variant.util'

export class LessCopyDialog {
  static getNotification(): Dialog {
    return {
      id: 'export-less-copy',
      interpolateParams: {
        usage: toUnicodeVariant('color: @color-500;', 'm'),
      },
      actions: [
        {
          id: 'more',
          callback: async () => {
            window.open(
              'https://lesscss.org/features/#variables-feature-overview',
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
