import { importProvidersFrom } from '@angular/core'
import { NgxMatomoTrackerModule } from '@ngx-matomo/tracker'
import { NgxMatomoRouterModule } from '@ngx-matomo/router'

export const matomoProvidersMock = [
  importProvidersFrom(
    NgxMatomoTrackerModule.forRoot({
      siteId: 1,
      trackerUrl: 'https://analytics.apps.pawcode.de',
      disabled: true,
    })
  ),
  importProvidersFrom(NgxMatomoRouterModule.forRoot()),
]
