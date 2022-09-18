import {EventEmitter} from "@angular/core";
import {PaletteExporter} from "../class/palette-exporter";
import {Palette} from "../models/palette.model";
import {Dialog} from "../interfaces/dialog.interface";
import {TailwindCopyDialog} from "./tailwind-copy.dialog";
import {TailwindFileDialog} from "./tailwind-file.dialog";
import {ToUnicodeVariantUtil} from "../utils/to-unicode-variant.util";

export class TailwindDialog {

  constructor(
    private notification: EventEmitter<Dialog | undefined>,
    private palette: Palette
  ) { }

  getNotification() {
    const tailwindCopyEmitter = new EventEmitter()
    tailwindCopyEmitter.subscribe(() => {
      const tailwind = PaletteExporter.exportPaletteToTailwind(this.palette)
      navigator.clipboard.writeText(tailwind).then(() => {
        this.notification.emit(new TailwindCopyDialog(
          this.notification
        ).getNotification())
      }).catch(e => {
        this.notification.emit({
          message: `An error occurred while copying to the clipboard\n\n${e}`,
          actions: []
        })
      })
    })

    const tailwindFileEmitter = new EventEmitter()
    tailwindFileEmitter.subscribe(() => {
      const tailwind = PaletteExporter.exportTailwindFile(this.palette)
      const blob = new Blob([tailwind], {type: 'text/javascript'})

      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = 'tailwind.colors.js'
      a.click()

      this.notification.emit(new TailwindFileDialog(
        this.notification
      ).getNotification())
    })

    return {
      message: `Do you want to copy the colors to your existing ${ToUnicodeVariantUtil.toUnicodeVariant('tailwind.config.js', 'm')} or create an extra file only for your palette?`,
      actions: [{
        text: 'Copy',
        title: 'Copy content in existing file',
        action: tailwindCopyEmitter
      }, {
        text: 'File',
        title: 'Download a new file',
        action: tailwindFileEmitter
      }]
    }
  }

}
