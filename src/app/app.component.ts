import { Component } from '@angular/core';
import {Palette} from "./models/palette.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tailwind-color-generator';

  palettes = [
    new Palette('#64748b', 'Slate'),
    new Palette('#6b7280', 'Gray'),
    new Palette('#71717a', 'Zinc'),
    new Palette('#737373', 'Neutral'),
    new Palette('#78716c', 'Stone'),
    new Palette('#ef4444', 'Red'),
    new Palette('#f97316', 'Orange'),
    new Palette('#f59c0b', 'Amber'),
    new Palette('#eab308', 'Yellow'),
    new Palette('#84cc16', 'Lime'),
    new Palette('#22c55e', 'Green'),
    new Palette('#10b981', 'Emerald'),
    new Palette('#14b8a6', 'Teal'),
    new Palette('#06b6d4', 'Cyan'),
    new Palette('#0ea5e9', 'Sky'),
    new Palette('#3b82f6', 'Blue'),
    new Palette('#6366f1', 'Indigo'),
    new Palette('#8b5cf6', 'Violet'),
    new Palette('#a855f7', 'Purple'),
    new Palette('#d946ef', 'Fuchsia'),
    new Palette('#ec4899', 'Pink'),
    new Palette('#f43f5e', 'Rose'),
  ]

}
