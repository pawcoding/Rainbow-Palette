import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, signal } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { heroArrowLeftMini, heroXMarkMini } from '@ng-icons/heroicons/mini';
import { TranslateModule } from '@ngx-translate/core';
import { ExportFormat } from '../shared/constants/export-format';
import { ExportService, ToastService } from '../shared/data-access';
import { Palette } from '../shared/model';
import { ExportOption } from '../shared/types/export-option';
import { ExportDownloadComponent } from './ui/export-download/export-download.component';
import { ExportFormatComponent } from './ui/export-format/export-format.component';
import { ExportSuccessComponent } from './ui/export-success/export-success.component';
import { RequestFormatComponent } from './ui/request-format/request-format.component';

enum ExportModalState {
  FORMAT = 'format',
  DOWNLOAD = 'download',
  SUCCESS = 'success',
}

@Component({
  selector: 'rp-export-modal',
  standalone: true,
  imports: [
    TranslateModule,
    ExportFormatComponent,
    ExportDownloadComponent,
    ExportSuccessComponent,
    RequestFormatComponent,
    NgIconComponent,
  ],
  templateUrl: './export-modal.component.html',
})
export class ExportModalComponent {
  protected readonly ExportModalState = ExportModalState;
  protected readonly ExportFormat = ExportFormat;

  private readonly _data = inject<{ palette: Palette }>(DIALOG_DATA);
  private readonly _dialogRef = inject(DialogRef);
  private readonly _toastService = inject(ToastService);
  private readonly _exportService = inject(ExportService);

  protected readonly palette = signal(this._data.palette);
  protected readonly state = signal(ExportModalState.FORMAT);
  protected readonly format = signal<ExportFormat | undefined>(undefined);
  protected readonly downloadOption = signal<ExportOption | undefined>(
    undefined
  );

  protected readonly heroXMarkMini = heroXMarkMini;
  protected readonly heroArrowLeftMini = heroArrowLeftMini;

  protected choseFormat(format: ExportFormat): void {
    this.format.set(format);
    this.state.set(ExportModalState.DOWNLOAD);
  }

  protected async choseDownloadFormat(action: ExportOption): Promise<void> {
    this.downloadOption.set(action);

    const format = this.format();
    if (!format) {
      this._toastService.showToast({
        type: 'error',
        message: 'export.error.format-not-found',
      });
      this.close();
      return;
    }

    const success = await this._exportService.exportPalette(
      this.palette(),
      format,
      action
    );

    if (success) {
      this.state.set(ExportModalState.SUCCESS);
    } else {
      this.close();
    }
  }

  protected back(): void {
    switch (this.state()) {
      case ExportModalState.DOWNLOAD:
        this.state.set(ExportModalState.FORMAT);
        break;
      case ExportModalState.SUCCESS:
        this.state.set(ExportModalState.DOWNLOAD);
        break;
    }
  }

  protected close(): void {
    this._dialogRef.close();
  }
}
