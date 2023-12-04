import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { ColorViewerComponent } from './components/color-viewer/color-viewer.component'
import { PaletteViewerComponent } from './components/palette-viewer/palette-viewer.component'
import { StorageService } from './services/storage.service'
import { LightSwitchComponent } from './components/light-switch/light-switch.component'
import { ColorEditorComponent } from './components/color-editor/color-editor.component'
import { ColorService } from './services/color.service'
import { DialogComponent } from './components/dialog/dialog.component'
import { NotificationComponent } from './components/notification/notification.component'
import { HomeComponent } from './pages/home/home.component'
import { AppRoutingModule } from './app-routing.module'
import { EditComponent } from './pages/edit/edit.component'
import { SafeHtmlPipe } from './pipes/safe-html.pipe'
import { PreviewComponent } from './pages/preview/preview.component'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component'
import {
  MatomoConsentMode,
  NgxMatomoModule,
  NgxMatomoRouterModule,
} from 'ngx-matomo-client'
import { AnalyticsInterceptor } from './interceptors/analytics.interceptor'
import { AnalyticsComponent } from './pages/analytics/analytics.component'
import { IconsModule } from './icons.module'

@NgModule({
  declarations: [
    AppComponent,
    ColorEditorComponent,
    ColorViewerComponent,
    DialogComponent,
    HomeComponent,
    LightSwitchComponent,
    NotificationComponent,
    PaletteViewerComponent,
    EditComponent,
    SafeHtmlPipe,
    PreviewComponent,
    LanguageSelectorComponent,
    AnalyticsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    IconsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    NgxMatomoModule.forRoot({
      siteId: 1,
      trackerUrl: 'https://analytics.apps.pawcode.de/',
      enableJSErrorTracking: true,
      acceptDoNotTrack: true,
      requireConsent: MatomoConsentMode.TRACKING,
      disabled: !environment.production,
    }),
    NgxMatomoRouterModule.forRoot({
      interceptors: [AnalyticsInterceptor],
      trackPageTitle: false,
    }),
  ],
  providers: [ColorService, StorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http)
}
