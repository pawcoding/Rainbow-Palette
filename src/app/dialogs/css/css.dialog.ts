import { PaletteExporter } from '../../class/palette-exporter'
import { Palette } from '../../models/palette.model'
import { Dialog } from '../../interfaces/dialog.interface'
import { CssCopyDialog } from './css-copy.dialog'
import { CssFileDialog } from './css-file.dialog'

export class CssDialog {
  static getNotification(palette: Palette): Dialog {
    return {
      id: 'export-css',
      actions: [
        {
          id: 'copy',
          callback: async () => {
            const css = PaletteExporter.exportPaletteToCSS(palette)
            try {
              await navigator.clipboard.writeText(css)
              return CssCopyDialog.getNotification()
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
            const css = PaletteExporter.exportCSSFile(palette)
            const blob = new Blob([css], { type: 'text/css' })

            const a = document.createElement('a')
            a.href = URL.createObjectURL(blob)
            a.download = 'colors.css'
            a.click()

            return CssFileDialog.getNotification()
          },
        },
      ],
    }
  }
}
