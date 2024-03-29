import { Component, output } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { TranslateModule } from '@ngx-translate/core';
import { EXPORT_FORMATS, ExportFormat } from '../../../shared/constants/export-format';

@Component({
  selector: 'rp-export-format',
  standalone: true,
  imports: [TranslateModule, NgIconComponent],
  templateUrl: './export-format.component.html',
  styles: ':host { display: block; }'
})
export class ExportFormatComponent {
  public readonly choseExportFormat = output<ExportFormat>();

  protected readonly formats = EXPORT_FORMATS;

  protected choseFormat(format: ExportFormat): void {
    this.choseExportFormat.emit(format);
  }
}
