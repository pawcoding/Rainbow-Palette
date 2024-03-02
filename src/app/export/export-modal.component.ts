import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Palette } from '../shared/model/palette.model';
import { ExportFormat } from './constants/export-format';
import { ExportFormatComponent } from './ui/export-format/export-format.component';

enum ExportModalState {
  FORMAT = 'format',
  DOWNLOAD = 'download',
  SUCCESS = 'success',
}

@Component({
  selector: 'rp-export-modal',
  standalone: true,
  imports: [TranslateModule, ExportFormatComponent],
  templateUrl: './export-modal.component.html',
})
export class ExportModalComponent {
  protected readonly ExportModalState = ExportModalState;

  private readonly _data = inject<{ palette: Palette }>(DIALOG_DATA);
  private readonly _dialogRef = inject(DialogRef);

  protected readonly palette = signal(this._data.palette);
  protected readonly state = signal(ExportModalState.FORMAT);
  protected readonly format = signal<ExportFormat | undefined>(undefined);

  protected choseFormat(format: ExportFormat): void {
    this.format.set(format);
    this.state.set(ExportModalState.DOWNLOAD);
  }
}
