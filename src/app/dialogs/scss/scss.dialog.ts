import { Palette } from '../../models/palette.model'
import { Dialog } from 'src/app/types/dialog.type'
import { ScssCopyDialog } from './scss-copy.dialog'
import { ScssFileDialog } from './scss-file.dialog'
import { ScssExporter } from 'src/app/exporter/scss.exporter'

export class ScssDialog {
  static getNotification(palette: Palette): Dialog {
    const exporter = new ScssExporter()

    return {
      id: 'export-scss',
      actions: [
        {
          id: 'copy',
          callback: async () => {
            const scss = exporter.exportContent(palette)
            try {
              await navigator.clipboard.writeText(scss)
              return ScssCopyDialog.getNotification()
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
            const scss = exporter.exportFile(palette)
            const blob = new Blob([scss], { type: 'text/scss' })

            const a = document.createElement('a')
            a.href = URL.createObjectURL(blob)
            a.download = '_colors.scss'
            a.click()

            return ScssFileDialog.getNotification()
          },
        },
      ],
    }
  }
}
