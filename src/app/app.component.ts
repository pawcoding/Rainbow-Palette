import { Component } from '@angular/core';
import {Palette} from "./models/palette.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tailwind-color-generator';

  palette = new Palette('pawcode')

  constructor() {
    //this.palette.addColor('pawcode', '#4472c4')
    this.palette.addColor('Slate', '#64748b')
    this.palette.addColor('Gray', '#6b7280')
    this.palette.addColor('Zinc', '#71717a')
    this.palette.addColor('Neutral', '#737373')
    this.palette.addColor('Stone', '#78716c')
    this.palette.addColor('Red', '#ef4444')
    this.palette.addColor('Orange', '#f97316')
    this.palette.addColor('Amber', '#f59c0b')
    this.palette.addColor('Yellow', '#eab308')
    this.palette.addColor('Lime', '#84cc16')
    this.palette.addColor('Green', '#22c55e')
    this.palette.addColor('Emerald', '#10b981')
    this.palette.addColor('Teal', '#14b8a6')
    this.palette.addColor('Cyan', '#06b6d4')
    this.palette.addColor('Sky', '#0ea5e9')
    this.palette.addColor('Blue', '#3b82f6')
    this.palette.addColor('Indigo', '#6366f1')
    this.palette.addColor('Violet', '#8b5cf6')
    this.palette.addColor('Purple', '#a855f7')
    this.palette.addColor('Fuchsia', '#d946ef')
    this.palette.addColor('Pink', '#ec4899')
    this.palette.addColor('Rose', '#f43f5e')
  }

}
