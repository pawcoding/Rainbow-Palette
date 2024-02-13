import { Component } from '@angular/core';
import { HomeManualComponent } from './ui/home-manual/home-manual.component';

@Component({
  selector: 'rp-home',
  standalone: true,
  imports: [HomeManualComponent],
  templateUrl: './home.component.html',
})
export default class HomeComponent {}
