import { inject } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { MatomoRouterInterceptor, MatomoTracker } from 'ngx-matomo-client';
import { Observable } from 'rxjs';

export class MatomoTitleInterceptor implements MatomoRouterInterceptor {
  private readonly _tracker = inject(MatomoTracker);

  public beforePageTrack(
    event: NavigationEnd
  ): void | Observable<void> | Promise<void> {
    switch (event.urlAfterRedirects) {
      case '/':
        this._tracker.setDocumentTitle('Home');
        break;
      case '/view':
        this._tracker.setDocumentTitle('View');
        break;
      case '/preview':
        this._tracker.setDocumentTitle('Preview');
        break;
      default:
        this._tracker.setDocumentTitle('Unknown');
        console.warn('Unknown page: ', event.urlAfterRedirects);
        break;
    }
  }
}
