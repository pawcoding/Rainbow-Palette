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
    EditComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule
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
