import {EventEmitter} from "@angular/core";
import {PaletteExporter} from "../class/palette-exporter";
import {Palette} from "../models/palette.model";
import {Dialog} from "../interfaces/dialog.interface";
import {CssCopyDialog} from "./css-copy.dialog";
import {CssFileDialog} from "./css-file.dialog";

export class CssDialog {

  constructor(
    private notification: EventEmitter<Dialog | undefined>,
    private palette: Palette
  ) { }

  getNotification() {
    const cssCopyEmitter = new EventEmitter()
    cssCopyEmitter.subscribe(() => {
      const css = PaletteExporter.exportPaletteToCSS(this.palette)
      navigator.clipboard.writeText(css).then(() => {
        this.notification.emit(new CssCopyDialog(
          this.notification
        ).getNotification())
      }).catch(e => {
        this.notification.emit({
          message: `An error occurred while copying to the clipboard\n\n${e}`,
          actions: []
        })
      })
    })

    const cssFileEmitter = new EventEmitter()
    cssFileEmitter.subscribe(() => {
      const css = PaletteExporter.exportCssFile(this.palette)
      const blob = new Blob([css], {type: 'text/css'})

      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = 'colors.css'
      a.click()

      this.notification.emit(new CssFileDialog(
        this.notification
      ).getNotification())
    })

    return {
      message: 'Do you want to copy the CSS properties into your own files or create a new one?',
      actions: [{
        text: 'Copy',
        title: 'Copy content in own CSS file',
        action: cssCopyEmitter
      }, {
        text: 'File',
        title: 'Download a new file',
        action: cssFileEmitter
      }]
    }
  }

}
