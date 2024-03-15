import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'rp-layout-analytics-consent',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './layout-analytics-consent.component.html',
  styleUrl: './layout-analytics-consent.component.css',
})
export class LayoutAnalyticsConsentComponent {
  protected readonly matomo =
    '<a href="https://matomo.org/" target="_blank" class="underline">Matomo</a>';

  @Output()
  public readonly consent = new EventEmitter<boolean>();

  public accept(): void {
    this.consent.emit(true);
  }

  public decline(): void {
    this.consent.emit(false);
  }
}
