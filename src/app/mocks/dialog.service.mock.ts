import { Signal, signal } from '@angular/core'
import { DialogService } from '../services/dialog.service'
import { Dialog } from '../types/dialog.type'
import { sleep } from '../utils/sleep.util'

const DIALOG_MOCK_TIMEOUT = 'DIALOG_MOCK_TIMEOUT'

export class DialogServiceMock implements Partial<DialogService> {
  public openDialog(dialog: Dialog): void {
    console.log(`DialogService.openDialog(${dialog})`)
  }

  public closeDialog(): void {
    console.log('DialogService.closeDialog()')
  }

  public get dialog(): Signal<Dialog | undefined> {
    console.log('DialogService.dialog')

    const dialog = signal<Dialog | undefined>(undefined)

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

    dialog.set(dialogContent)

    return dialog.asReadonly()
  }
}
