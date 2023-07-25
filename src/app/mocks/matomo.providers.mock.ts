import { importProvidersFrom } from '@angular/core'
import { NgxMatomoModule, NgxMatomoRouterModule } from 'ngx-matomo-client'

export const matomoProvidersMock = [
  importProvidersFrom(
    NgxMatomoModule.forRoot({
      siteId: 1,
      trackerUrl: 'https://analytics.apps.pawcode.de',
      disabled: true,
    })
  ),
  importProvidersFrom(NgxMatomoRouterModule.forRoot()),
]
