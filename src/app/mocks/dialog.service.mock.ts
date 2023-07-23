import { Signal, signal } from '@angular/core'
import { DialogService } from '../services/dialog.service'
import { Dialog } from '../types/dialog.type'
import { sleep } from '../utils/sleep.util'

const DIALOG_MOCK_TIMEOUT = 'DIALOG_MOCK_TIMEOUT'

class DialogServiceMock implements Partial<DialogService> {
  private readonly _isExportDialog: boolean

  constructor(isExportDialog: boolean = false) {
    this._isExportDialog = isExportDialog
  }

  public openDialog(dialog: Dialog): void {
    console.log(`DialogService.openDialog(${dialog})`)
  }

  public closeDialog(): void {
    console.log('DialogService.closeDialog()')
  }

  public get dialog(): Signal<Dialog | undefined> {
    console.log('DialogService.dialog')

    const dialog = signal<Dialog | undefined>(undefined)

    const exportDialog: Dialog = {
      id: 'export-palette',
      custom: true,
      actions: [
        {
          id: 'css',
        },
        {
          id: 'scss',
        },
        {
          id: 'tailwind',
        },
      ],
    }

    const dialogContent: Dialog = {
      id: 'test',
      actions: [
        {
          id: 'wait',
          callback: async () => {
            dialog.set(undefined)
            await sleep(2000, DIALOG_MOCK_TIMEOUT)
            dialog.set(dialogContent)
            return dialogContent
          },
        },
        {
          id: 'next',
          callback: async () => {
            return dialogContent
          },
        },
      ],
    }

    dialog.set(this._isExportDialog ? exportDialog : dialogContent)

    return dialog.asReadonly()
  }
}

export const dialogServiceMockFactory = (isExportDialog: boolean = false) => {
  return () => new DialogServiceMock(isExportDialog)
}
