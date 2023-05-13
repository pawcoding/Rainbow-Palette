import { Injectable, Signal, signal } from '@angular/core'
import { Dialog } from '../types/dialog.type'

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private _dialog = signal<Dialog | undefined>(undefined)

  /**
   * Open a dialog
   * @param dialog
   */
  public openDialog(dialog: Dialog): void {
    this._dialog.set(dialog)
  }

  /**
   * Close the current dialog
   */
  public closeDialog(): void {
    this._dialog.set(undefined)
  }

  /**
   * Readonly dialog signal
   */
  public get dialog(): Signal<Dialog | undefined> {
    return this._dialog.asReadonly()
  }
}
