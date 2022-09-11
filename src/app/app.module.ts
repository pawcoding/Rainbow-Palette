import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ColorViewerComponent } from './components/color-viewer/color-viewer.component';
import { PaletteViewerComponent } from './components/palette-viewer/palette-viewer.component';
import {StorageService} from "./services/storage.service";
import { LightSwitchComponent } from './components/light-switch/light-switch.component';
import { ColorEditorComponent } from './components/color-editor/color-editor.component';
import {ColorService} from "./services/color.service";
import { ExportDialogComponent } from './components/export-dialog/export-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ColorViewerComponent,
    PaletteViewerComponent,
    LightSwitchComponent,
    ColorEditorComponent,
    ExportDialogComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    StorageService,
    ColorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
