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
          icon: 'simpleCss3',
          color: '#1572B6',
          callback: async () => CssDialog.getNotification(this.palette),
        },
        {
          id: 'scss',
          icon: 'simpleSass',
          color: '#CC6699',
          callback: async () => ScssDialog.getNotification(this.palette),
        },
        {
          id: 'less',
          icon: 'simpleLess',
          color: '#1D365D',
          callback: async () => LessDialog.getNotification(this.palette),
        },
        {
          id: 'tailwind',
          icon: 'simpleTailwindcss',
          color: '#06B5D4',
          callback: async () => TailwindDialog.getNotification(this.palette),
        },
        {
          id: 'request-format',
          icon: 'heroPlusCircle',
          callback: async () => RequestFormatDialog.getNotification(),
        },
      ],
      custom: true,
    }
  }
}
