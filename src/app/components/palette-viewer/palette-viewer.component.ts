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
  palette : Palette = new Palette('#4472c4')

  colors: any[] = []

  constructor() { }

  ngOnInit(): void {
    for (const colorsKey in this.palette.colors) {
      // @ts-ignore
      this.colors.push({step: colorsKey, value: this.palette.colors[colorsKey]})
    }

    this.colors = this.colors.sort((a, b) => a.step - b.step).map(c => c.value)
  }

  backgroundIsLight(color: string): boolean {
    return ColorConverter.rgbToHsl(color).l > 50
  }

}
