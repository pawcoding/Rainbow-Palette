import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ColorViewerComponent } from './components/color-viewer/color-viewer.component';
import { PaletteViewerComponent } from './components/palette-viewer/palette-viewer.component';
import { ShadePickerComponent } from './components/shade-picker/shade-picker.component';
import {StorageService} from "./services/storage.service";
import { LightSwitchComponent } from './components/light-switch/light-switch.component';
import { ColorEditorComponent } from './components/color-editor/color-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ColorViewerComponent,
    PaletteViewerComponent,
    ShadePickerComponent,
    LightSwitchComponent,
    ColorEditorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
