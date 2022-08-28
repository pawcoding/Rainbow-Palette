import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ColorViewerComponent } from './components/color-viewer/color-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    ColorViewerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
