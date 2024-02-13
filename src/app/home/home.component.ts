import { Component } from '@angular/core';
import { HomeManualComponent } from './ui/home-manual/home-manual.component';
import { HomeSupportComponent } from './ui/home-support/home-support.component';

@Component({
  selector: 'rp-home',
  standalone: true,
  imports: [HomeManualComponent, HomeSupportComponent],
  templateUrl: './home.component.html',
})
export default class HomeComponent {}
