import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ColorViewerComponent } from './components/color-viewer/color-viewer.component';
import { PaletteViewerComponent } from './components/palette-viewer/palette-viewer.component';
import { ShadePickerComponent } from './components/shade-picker/shade-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    ColorViewerComponent,
    PaletteViewerComponent,
    ShadePickerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
