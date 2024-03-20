import { ViewportScroller } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { AnalyticsService, AnalyticsStatus } from '../shared/data-access/analytics.service';
import { LanguageService } from '../shared/data-access/language.service';
import { AccordionComponent } from '../shared/ui/accordion/accordion.component';
import { sleep } from '../shared/utils/sleep';

@Component({
  selector: 'rp-imprint',
  standalone: true,
  imports: [TranslateModule, AccordionComponent, RouterLink],
  templateUrl: './imprint.component.html'
})
export default class ImprintComponent {
  private readonly _router = inject(Router);
  private readonly _viewportScroller = inject(ViewportScroller);
  private readonly _analyticsService = inject(AnalyticsService);
  private readonly _languageService = inject(LanguageService);

  private readonly _anchorScrolling = this._router.events
    .pipe(
      takeUntilDestroyed(),
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    )
    .subscribe(async (event) => {
      if (event.urlAfterRedirects.includes('#')) {
        // Wait for scroll to finish
        await sleep(10);

        // Calculate new scroll position to account for header
        const position = this._viewportScroller.getScrollPosition();
        const headerHeight = document.documentElement.style.getPropertyValue('--header-height');
        const offset = headerHeight ? parseInt(headerHeight) : 0;

        // Scroll to new position
        this._viewportScroller.scrollToPosition([position[0], position[1] - offset - 32]);
      }
    });

  protected readonly matomo =
    '<a href="https://matomo.org/" target="_blank" rel="noopener" class="underline">Matomo</a>';

  protected readonly analyticsEnabled = computed(() => {
    return this._analyticsService.status() === AnalyticsStatus.ACCEPTED;
  });

  protected readonly german = computed(() => {
    return this._languageService.language() === 'de';
  });

  protected enableAnalytics(): void {
    this._analyticsService.acceptAnalytics();
  }

  protected disableAnalytics(): void {
    this._analyticsService.declineAnalytics();
  }
}
