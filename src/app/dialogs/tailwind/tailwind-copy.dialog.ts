import { Dialog } from '../../interfaces/dialog.interface'
import { toUnicodeVariant } from '../../utils/to-unicode-variant.util'

export class TailwindCopyDialog {
  static getNotification(): Dialog {
    return {
      id: 'export-tailwind-copy',
      interpolateParams: {
        config: toUnicodeVariant('tailwind.config.js', 'm'),
      },
      actions: [
        {
          id: 'more',
          callback: async () => {
            window.open(
              'https://tailwindcss.com/docs/customizing-colors#color-object-syntax',
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
