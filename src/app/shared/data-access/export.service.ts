import { Dialog } from '@angular/cdk/dialog';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom, tap } from 'rxjs';
import { Palette } from '../model/palette.model';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private readonly _dialog = inject(Dialog);
  private readonly _isModalOpen = signal(false);

  public async openExportModal(palette: Palette): Promise<void> {
    if (this._isModalOpen()) {
      return;
    }
    this._isModalOpen.set(true);

    const exportModal = await import(
      '../../export/export-modal.component'
    ).then((c) => c.ExportModalComponent);
    const dialogRef = this._dialog.open<void>(exportModal, {
      backdropClass: 'rp-modal-backdrop',
      data: {
        palette,
      },
    });

    return await firstValueFrom(
      dialogRef.closed.pipe(tap(() => this._isModalOpen.set(false)))
    );
  }
}
