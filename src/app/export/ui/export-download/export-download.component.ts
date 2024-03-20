import { Component, EventEmitter, Output, input } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import {
  heroArrowDownTray,
  heroDocumentDuplicate
} from '@ng-icons/heroicons/outline';
import { TranslateModule } from '@ngx-translate/core';
import { ExportFormat } from '../../../shared/constants/export-format';
import { ExportOption } from '../../../shared/types/export-option';

@Component({
  selector: 'rp-export-download',
  standalone: true,
  imports: [TranslateModule, NgIconComponent],
  templateUrl: './export-download.component.html',
  styles: `:host { display: block; }`
})
export class ExportDownloadComponent {
  public readonly exportFormat = input.required<ExportFormat>();

  @Output()
  public readonly choseDownloadFormat = new EventEmitter<ExportOption>();

  protected readonly heroArrowDownTray = heroArrowDownTray;
  protected readonly heroDocumentDuplicate = heroDocumentDuplicate;

  protected download(): void {
    this.choseDownloadFormat.emit('file');
  }

  protected copy(): void {
    this.choseDownloadFormat.emit('copy');
  }
}
