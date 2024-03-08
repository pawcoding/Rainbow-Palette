import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  MatomoConsentMode,
  provideMatomo,
  withRouter,
  withRouterInterceptors,
} from 'ngx-matomo-client';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { MatomoTitleInterceptor } from './shared/utils/matomo-title-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
          deps: [HttpClient],
        },
      })
    ),
    provideMatomo(
      {
        siteId: 1,
        trackerUrl: 'https://analytics.apps.pawcode.de/',
        enableJSErrorTracking: true,
        acceptDoNotTrack: true,
        requireConsent: MatomoConsentMode.COOKIE,
        disabled: !environment.production,
        runOutsideAngularZone: true,
      },
      withRouter({
        delay: 1000,
        trackPageTitle: false,
      }),
      withRouterInterceptors([MatomoTitleInterceptor])
    ),
  ],
};
