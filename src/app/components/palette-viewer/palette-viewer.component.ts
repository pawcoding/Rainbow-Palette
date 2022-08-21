import {Component, Input, OnInit} from '@angular/core';
import {Palette} from "../../models/palette.model";
import {ColorConverter} from "../../class/color-converter";

@Component({
  selector: 'app-palette-viewer',
  templateUrl: './palette-viewer.component.html',
  styleUrls: ['./palette-viewer.component.css']
})
export class PaletteViewerComponent implements OnInit {

  @Input()
  palette : Palette = new Palette()

  constructor() { }

  ngOnInit(): void {
    const hsl = ColorConverter.rgbToHsl(this.palette.colors["500"])
    console.info(hsl)
    console.info(ColorConverter.hslToRgb(hsl.h, hsl.s, hsl.l))
  }

  backgroundIsLight(color: string): boolean {
    return ColorConverter.rgbToHsl(color).l > 50
  }

}
