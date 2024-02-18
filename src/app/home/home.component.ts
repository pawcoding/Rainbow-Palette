import { Component } from '@angular/core';
import { Shade } from '../shared/model/shade.model';
import { HomeGeneratorComponent } from './ui/home-generator/home-generator.component';
import { HomeManualComponent } from './ui/home-manual/home-manual.component';
import { HomeSupportComponent } from './ui/home-support/home-support.component';

@Component({
  selector: 'rp-home',
  standalone: true,
  imports: [HomeGeneratorComponent, HomeManualComponent, HomeSupportComponent],
  templateUrl: './home.component.html',
})
export default class HomeComponent {
  protected readonly shade = Shade.random();

  protected generatePalette(hex: string, schema: unknown): void {
    console.log('Generate palette', hex, schema);
  }
}
