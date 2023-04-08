import {EventEmitter} from "@angular/core";
import {PaletteExporter} from "../class/palette-exporter";
import {Palette} from "../models/palette.model";
import {Dialog} from "../interfaces/dialog.interface";
import {TailwindCopyDialog} from "./tailwind-copy.dialog";
import {TailwindFileDialog} from "./tailwind-file.dialog";
import {toUnicodeVariant} from "../utils/to-unicode-variant.util";

export class TailwindDialog {

  constructor(
    private notification: EventEmitter<Dialog | undefined>,
    private palette: Palette,
  ) { }

  getNotification(): Dialog {
    const tailwindCopyEmitter = new EventEmitter()
    tailwindCopyEmitter.subscribe(() => {
      const tailwind = PaletteExporter.exportPaletteToTailwind(this.palette)
      navigator.clipboard.writeText(tailwind).then(() => {
        this.notification.emit(new TailwindCopyDialog(
          this.notification
        ).getNotification())
      }).catch(e => {
        this.notification.emit({
          id: 'copy-error',
          interpolateParams:{
            error: e
          }
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
      id: 'export-tailwind',
      interpolateParams: {
        file: toUnicodeVariant('tailwind.colors.js', 'm'),
      },
      actions: [{
        id: 'copy',
        action: tailwindCopyEmitter
      }, {
        id: 'file',
        action: tailwindFileEmitter
      }]
    }
  }

}
