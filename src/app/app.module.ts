import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PaletteViewerComponent } from './components/palette-viewer/palette-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    PaletteViewerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
