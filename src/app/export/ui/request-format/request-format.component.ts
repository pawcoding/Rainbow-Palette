import { Component } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { TranslateModule } from '@ngx-translate/core';
import { EXPORT_FORMATS } from '../../constants/export-format';

@Component({
  selector: 'rp-request-format',
  standalone: true,
  imports: [TranslateModule, NgIconComponent],
  templateUrl: './request-format.component.html',
  styles: `:host { display: block; }`,
})
export class RequestFormatComponent {
  protected formats = EXPORT_FORMATS;
}
