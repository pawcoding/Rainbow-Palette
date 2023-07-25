import { Palette } from '../../models/palette.model'
import { Dialog } from 'src/app/types/dialog.type'
import { CssCopyDialog } from './css-copy.dialog'
import { CssFileDialog } from './css-file.dialog'
import { CssExporter } from 'src/app/exporter/css.exporter'

export class CssDialog {
  static getNotification(palette: Palette): Dialog {
    const exporter = new CssExporter()

    return {
      id: 'export-css',
      actions: [
        {
          id: 'copy',
          callback: async () => {
            const css = exporter.exportContent(palette)
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
            const css = exporter.exportFile(palette)
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
