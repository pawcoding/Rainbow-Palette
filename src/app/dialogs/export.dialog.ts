import { EventEmitter } from '@angular/core'
import { Palette } from '../models/palette.model'
import { Dialog } from '../interfaces/dialog.interface'
import { CssDialog } from './css/css.dialog'
import { TailwindDialog } from './tailwind/tailwind.dialog'
import { ScssDialog } from './scss/scss.dialog'

export class ExportDialog {
  constructor(
    private notification: EventEmitter<Dialog | undefined>,
    private palette: Palette
  ) {}

  getNotification(): Dialog {
    const cssEmitter = new EventEmitter()
    cssEmitter.subscribe(() => {
      this.notification.emit(
        new CssDialog(this.notification, this.palette).getNotification()
      )
    })

    const scssEmitter = new EventEmitter()
    scssEmitter.subscribe(() => {
      this.notification.emit(
        new ScssDialog(this.notification, this.palette).getNotification()
      )
    })

    const tailwindEmitter = new EventEmitter()
    tailwindEmitter.subscribe(() => {
      this.notification.emit(
        new TailwindDialog(this.notification, this.palette).getNotification()
      )
    })

    return {
      id: 'export-palette',
      actions: [
        {
          id: 'css',
          action: cssEmitter,
        },
        {
          id: 'scss',
          action: scssEmitter,
        },
        {
          id: 'tailwind',
          action: tailwindEmitter,
        },
      ],
    }
  }
}
