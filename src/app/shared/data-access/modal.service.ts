import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly _dialog = inject(Dialog);
  private readonly _modalStack = new BehaviorSubject<
    Array<DialogRef<any, any>>
  >([]);

  public get modalChange(): Observable<void> {
    return this._modalStack.pipe(map(() => {}));
  }

  public async openModal<TModalResult, TModalData>(
    modal: ComponentType<TModalData>,
    config: DialogConfig<TModalData, DialogRef<TModalResult, TModalData>>
  ): Promise<TModalResult | undefined> {
    const dialogRef = this._dialog.open<TModalResult, TModalData, TModalData>(
      modal,
      config
    );

    this._modalStack.next([...this._modalStack.value, dialogRef]);

    return await firstValueFrom(dialogRef.closed);
  }

  public closeModal(id?: string, allAbove = false): void {
    const modalStack = this._modalStack.value;

    // If there are no modals, there is nothing to close
    if (modalStack.length === 0) {
      return;
    }

    if (!id) {
      // If no id is provided, close the top modal
      modalStack.pop()?.close();
    } else {
      // Find the modal by its id
      const index = modalStack.findIndex((modal) => modal.id === id);

      // If the modal is not found, there is nothing to close
      if (index === -1) {
        return;
      }

      if (!allAbove) {
        // Close the modal and remove it from the stack
        modalStack[index].close();
        modalStack.splice(index, 1);
      } else {
        // Close all modals above the found modal
        while (modalStack.length > index) {
          modalStack.pop()?.close();
        }
      }
    }

    // Update the modal stack
    this._modalStack.next(modalStack);
  }
}
