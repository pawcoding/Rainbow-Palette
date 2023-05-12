import { Dialog } from '../../interfaces/dialog.interface'
import { toUnicodeVariant } from '../../utils/to-unicode-variant.util'

export class TailwindFileDialog {
  static getNotification(): Dialog {
    return {
      id: 'export-tailwind-file',
      interpolateParams: {
        file: toUnicodeVariant('tailwind.colors.js', 'm'),
        config: toUnicodeVariant('tailwind.config.js', 'm'),
        import: toUnicodeVariant("colors: require('./tailwind.colors'),", 'm'),
      },
      actions: [
        {
          id: 'more',
          callback: async () => {
            window.open(
              'https://tailwindcss.com/docs/customizing-colors#using-the-default-colors',
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
