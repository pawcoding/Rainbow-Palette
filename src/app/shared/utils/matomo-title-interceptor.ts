import { inject } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { MatomoRouterInterceptor, MatomoTracker } from 'ngx-matomo-client';
import { Observable } from 'rxjs';

export class MatomoTitleInterceptor implements MatomoRouterInterceptor {
  private readonly _tracker = inject(MatomoTracker);

  public beforePageTrack(event: NavigationEnd): void | Observable<void> | Promise<void> {
    const url = event.urlAfterRedirects;
    if (url === '/') {
      this._tracker.setDocumentTitle('Home');
    } else if (url === '/preview') {
      this._tracker.setDocumentTitle('Preview');
    } else if (url === '/imprint') {
      this._tracker.setDocumentTitle('Imprint');
    } else if (url === '/view') {
      this._tracker.setDocumentTitle('List');
    } else if (url.startsWith('/view/')) {
      this._tracker.setDocumentTitle('Palette');
    } else {
      this._tracker.setDocumentTitle('Unknown');
      console.warn('Unknown page: ', url);
    }
  }
}
