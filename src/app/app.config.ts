import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withRouterConfig } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatomoConsentMode, provideMatomo, withRouter, withRouterInterceptors } from 'ngx-matomo-client';
import { routes } from './app.routes';
import { MatomoTitleInterceptor } from './shared/utils/matomo-title-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'top'
      }),
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withComponentInputBinding()
    ),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
          deps: [HttpClient]
        }
      })
    ),
    provideMatomo(
      {
        siteId: 1,
        trackerUrl: 'https://analytics.apps.pawcode.de/',
        enableJSErrorTracking: true,
        acceptDoNotTrack: true,
        requireConsent: MatomoConsentMode.TRACKING,
        disabled: isDevMode(),
        runOutsideAngularZone: true
      },
      withRouter({
        delay: 1000,
        trackPageTitle: false
      }),
      withRouterInterceptors([MatomoTitleInterceptor])
    ),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
