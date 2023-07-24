import { Palette } from '../models/palette.model'
import { Dialog } from '../types/dialog.type'
import { CssDialog } from './css/css.dialog'
import { TailwindDialog } from './tailwind/tailwind.dialog'
import { ScssDialog } from './scss/scss.dialog'
import { LessDialog } from './less/less.dialog'
import { RequestFormatDialog } from './request-format.dialog'

export class ExportDialog {
  constructor(private palette: Palette) {}

  getNotification(): Dialog {
    return {
      id: 'export-palette',
      actions: [
        {
          id: 'css',
          callback: async () => CssDialog.getNotification(this.palette),
        },
        {
          id: 'scss',
          callback: async () => ScssDialog.getNotification(this.palette),
        },
        {
          id: 'less',
          callback: async () => LessDialog.getNotification(this.palette),
        },
        {
          id: 'tailwind',
          callback: async () => TailwindDialog.getNotification(this.palette),
        },
        {
          id: 'request-format',
          callback: async () => RequestFormatDialog.getNotification(),
        },
      ],
      custom: true,
    }
  }
}
