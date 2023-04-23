import { EventEmitter } from '@angular/core'
import { PaletteExporter } from '../../class/palette-exporter'
import { Palette } from '../../models/palette.model'
import { Dialog } from '../../interfaces/dialog.interface'
import { CssCopyDialog } from './css-copy.dialog'
import { CssFileDialog } from './css-file.dialog'

export class CssDialog {
  constructor(
    private notification: EventEmitter<Dialog | undefined>,
    private palette: Palette
  ) {}

  getNotification(): Dialog {
    const cssCopyEmitter = new EventEmitter()
    cssCopyEmitter.subscribe(() => {
      const css = PaletteExporter.exportPaletteToCSS(this.palette)
      navigator.clipboard
        .writeText(css)
        .then(() => {
          this.notification.emit(
            new CssCopyDialog(this.notification).getNotification()
          )
        })
        .catch((e) => {
          this.notification.emit({
            id: 'copy-error',
            interpolateParams: {
              error: e,
            },
          })
        })
    })

    const cssFileEmitter = new EventEmitter()
    cssFileEmitter.subscribe(() => {
      const css = PaletteExporter.exportCSSFile(this.palette)
      const blob = new Blob([css], { type: 'text/css' })

      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = 'colors.css'
      a.click()

      this.notification.emit(
        new CssFileDialog(this.notification).getNotification()
      )
    })

    return {
      id: 'export-css',
      actions: [
        {
          id: 'copy',
          action: cssCopyEmitter,
        },
        {
          id: 'file',
          action: cssFileEmitter,
        },
      ],
    }
  }
}
