import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, computed, inject, signal } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { heroArrowLeftMini, heroXMarkMini } from '@ng-icons/heroicons/mini';
import { TranslateModule } from '@ngx-translate/core';
import { ToastService } from '../shared/data-access/toast.service';
import { Palette } from '../shared/model/palette.model';
import { ExportFormat } from './constants/export-format';
import { Exporter } from './interface/exporter';
import { CssExporter } from './model/css.exporter';
import { LessExporter } from './model/less.exporter';
import { ScssExporter } from './model/scss.exporter';
import { TailwindExporter } from './model/tailwind.exporter';
import { ExportOption } from './types/export-option';
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

  protected readonly palette = signal(this._data.palette);
  protected readonly state = signal(ExportModalState.FORMAT);
  protected readonly format = signal<ExportFormat | undefined>(undefined);
  protected readonly downloadOption = signal<ExportOption | undefined>(
    undefined
  );

  protected readonly formatter = computed<Exporter | undefined>(() => {
    switch (this.format()) {
      case ExportFormat.TAILWIND:
        return new TailwindExporter();
      case ExportFormat.SCSS:
        return new ScssExporter();
      case ExportFormat.CSS:
        return new CssExporter();
      case ExportFormat.LESS:
        return new LessExporter();
      default:
        return undefined;
    }
  });

  protected readonly heroXMarkMini = heroXMarkMini;
  protected readonly heroArrowLeftMini = heroArrowLeftMini;

  protected choseFormat(format: ExportFormat): void {
    this.format.set(format);
    this.state.set(ExportModalState.DOWNLOAD);
  }

  protected async choseDownloadFormat(action: ExportOption): Promise<void> {
    this.downloadOption.set(action);

    const formatter = this.formatter();
    if (!formatter) {
      this._toastService.showToast({
        type: 'error',
        message: 'export.error.format-not-found',
      });
      this.close();
      return;
    }

    if (action === 'copy') {
      const content = formatter.formatPalette(this.palette());

      try {
        await navigator.clipboard.writeText(content);
        this.state.set(ExportModalState.SUCCESS);
      } catch (error) {
        console.error(error);
        this.close();
        this._toastService.showToast({
          type: 'error',
          message: 'export.error.copy-failed',
        });
      }
    } else {
      const content = formatter.formatFile(this.palette());
      const blob = new Blob([content], { type: formatter.mimeType });

      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = formatter.filename;
      a.click();

      this.state.set(ExportModalState.SUCCESS);
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
