import { inject } from '@angular/core';
import { MatomoRouterInterceptorFn, MatomoTracker } from 'ngx-matomo-client';

export const titleInterceptor: MatomoRouterInterceptorFn = (event) => {
  const tracker = inject(MatomoTracker);

  const url = event.urlAfterRedirects;
  if (url === '/') {
    tracker.setDocumentTitle('Home');
  } else if (url === '/preview') {
    tracker.setDocumentTitle('Preview');
  } else if (url === '/imprint') {
    tracker.setDocumentTitle('Imprint');
  } else if (url === '/view') {
    tracker.setDocumentTitle('List');
  } else if (url.startsWith('/view/')) {
    tracker.setDocumentTitle('Palette');
  } else {
    tracker.setDocumentTitle('Unknown');
    console.warn('Unknown page: ', url);
  }
};
