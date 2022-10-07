import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ColorViewerComponent } from './components/color-viewer/color-viewer.component';
import { PaletteViewerComponent } from './components/palette-viewer/palette-viewer.component';
import { StorageService } from "./services/storage.service";
import { LightSwitchComponent } from './components/light-switch/light-switch.component';
import { ColorEditorComponent } from './components/color-editor/color-editor.component';
import { ColorService } from "./services/color.service";
import { DialogComponent } from './components/dialog/dialog.component';
import { NotificationComponent } from './components/notification/notification.component';
import { HomeComponent } from './pages/home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import { EditComponent } from './pages/edit/edit.component';
import {SafeHtmlPipeline} from "./pipelines/safe-html.pipeline";
import { PreviewComponent } from './pages/preview/preview.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
    SafeHtmlPipeline,
    PreviewComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    ColorService,
    StorageService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
