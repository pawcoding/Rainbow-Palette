import { Dialog } from '@angular/cdk/dialog';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom, tap } from 'rxjs';
import { Palette } from '../../shared/model';
import { ExportModalData } from '../export-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ExportModalService {
  private readonly _dialog = inject(Dialog);

  private readonly _isModalOpen = signal(false);

  public async openExportModal(palette: Palette): Promise<void> {
    if (this._isModalOpen()) {
      return;
    }
    this._isModalOpen.set(true);

    const exportModal = await import('../export-modal.component').then((c) => c.ExportModalComponent);
    const dialogRef = this._dialog.open<void, ExportModalData>(exportModal, {
      backdropClass: 'rp-modal-backdrop',
      data: {
        palette
      },
      panelClass: 'rp-modal-panel',
      width: 'inherit'
    });

    return await firstValueFrom(dialogRef.closed.pipe(tap(() => this._isModalOpen.set(false))));
  }
}
