import { Palette } from '../../models/palette.model'
import { Dialog } from 'src/app/types/dialog.type'
import { LessExporter } from 'src/app/exporter/less.exporter'
import { LessCopyDialog } from './less-copy.dialog'
import { LessFileDialog } from './less-file.dialog'

export class LessDialog {
  static getNotification(palette: Palette): Dialog {
    const exporter = new LessExporter()

    return {
      id: 'export-less',
      actions: [
        {
          id: 'copy',
          callback: async () => {
            const less = exporter.exportContent(palette)
            try {
              await navigator.clipboard.writeText(less)
              return LessCopyDialog.getNotification()
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
            const less = exporter.exportFile(palette)
            const blob = new Blob([less], { type: 'text/less' })

            const a = document.createElement('a')
            a.href = URL.createObjectURL(blob)
            a.download = 'colors.less'
            a.click()

            return LessFileDialog.getNotification()
          },
        },
      ],
    }
  }
}
