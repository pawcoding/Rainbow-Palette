import {
  Component,
  ElementRef,
  computed,
  output,
  viewChild
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'rp-layout-analytics-consent',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './layout-analytics-consent.component.html',
  styleUrl: './layout-analytics-consent.component.css'
})
export class LayoutAnalyticsConsentComponent {
  protected readonly matomo =
    '<a href="https://matomo.org/" target="_blank" class="underline">Matomo</a>';

  public readonly consent = output<boolean>();

  private readonly _container =
    viewChild.required<ElementRef<HTMLElement>>('container');

  public readonly height = computed(() => {
    return this._container().nativeElement.offsetHeight;
  });

  public accept(): void {
    this.consent.emit(true);
  }

  public decline(): void {
    this.consent.emit(false);
  }
}
