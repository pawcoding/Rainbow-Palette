import { NgModule } from '@angular/core'
import { NgxMatomoTrackerModule } from '@ngx-matomo/tracker'
import { NgxMatomoRouterModule } from '@ngx-matomo/router'

@NgModule({
  imports: [
    NgxMatomoTrackerModule.forRoot({
      siteId: 0,
      trackerUrl: '',
      disabled: true,
    }),
    NgxMatomoRouterModule.forRoot({}),
  ],
  exports: [NgxMatomoTrackerModule, NgxMatomoRouterModule],
})
export class MatomoMockModule {}
