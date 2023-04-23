import { EventEmitter } from '@angular/core'
import { PaletteExporter } from '../../class/palette-exporter'
import { Palette } from '../../models/palette.model'
import { Dialog } from '../../interfaces/dialog.interface'
import { ScssCopyDialog } from './scss-copy.dialog'
import { ScssFileDialog } from './scss-file.dialog'

export class ScssDialog {
  constructor(
    private notification: EventEmitter<Dialog | undefined>,
    private palette: Palette
  ) {}

  getNotification(): Dialog {
    const scssCopyEmitter = new EventEmitter()
    scssCopyEmitter.subscribe(() => {
      const scss = PaletteExporter.exportPaletteToSCSS(this.palette)
      navigator.clipboard
        .writeText(scss)
        .then(() => {
          this.notification.emit(
            new ScssCopyDialog(this.notification).getNotification()
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

    const scssFileEmitter = new EventEmitter()
    scssFileEmitter.subscribe(() => {
      const scss = PaletteExporter.exportSCSSFile(this.palette)
      const blob = new Blob([scss], { type: 'text/scss' })

      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = '_colors.scss'
      a.click()

      this.notification.emit(
        new ScssFileDialog(this.notification).getNotification()
      )
    })

    return {
      id: 'export-scss',
      actions: [
        {
          id: 'copy',
          action: scssCopyEmitter,
        },
        {
          id: 'file',
          action: scssFileEmitter,
        },
      ],
    }
  }
}
