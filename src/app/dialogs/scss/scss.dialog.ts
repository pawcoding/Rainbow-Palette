import { PaletteExporter } from '../../class/palette-exporter'
import { Palette } from '../../models/palette.model'
import { Dialog } from '../../interfaces/dialog.interface'
import { ScssCopyDialog } from './scss-copy.dialog'
import { ScssFileDialog } from './scss-file.dialog'

export class ScssDialog {
  static getNotification(palette: Palette): Dialog {
    return {
      id: 'export-scss',
      actions: [
        {
          id: 'copy',
          callback: async () => {
            const scss = PaletteExporter.exportPaletteToSCSS(palette)
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
            const scss = PaletteExporter.exportSCSSFile(palette)
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
