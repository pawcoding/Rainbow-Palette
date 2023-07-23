import { PaletteExporter } from '../../class/palette-exporter'
import { Palette } from '../../models/palette.model'
import { Dialog } from 'src/app/types/dialog.type'
import { TailwindCopyDialog } from './tailwind-copy.dialog'
import { TailwindFileDialog } from './tailwind-file.dialog'
import { toUnicodeVariant } from '../../utils/to-unicode-variant.util'

export class TailwindDialog {
  static getNotification(palette: Palette): Dialog {
    return {
      id: 'export-tailwind',
      interpolateParams: {
        file: toUnicodeVariant('tailwind.colors.js', 'm'),
      },
      actions: [
        {
          id: 'copy',
          callback: async () => {
            const tailwind = PaletteExporter.exportPaletteToTailwind(palette)
            try {
              await navigator.clipboard.writeText(tailwind)
              return TailwindCopyDialog.getNotification()
            } catch (e) {
              return {
                id: 'copy-error',
                interpolateParams: {
                  error: e,
                },
              } as Dialog
            }
          },
        },
        {
          id: 'file',
          callback: async () => {
            const tailwind = PaletteExporter.exportTailwindFile(palette)
            const blob = new Blob([tailwind], { type: 'text/javascript' })

            const a = document.createElement('a')
            a.href = URL.createObjectURL(blob)
            a.download = 'tailwind.colors.js'
            a.click()

            return TailwindFileDialog.getNotification()
          },
        },
      ],
    }
  }
}
