import {Component, Input, OnInit} from '@angular/core';
import {Palette} from "../../models/palette.model";

@Component({
  selector: 'app-palette-viewer',
  templateUrl: './palette-viewer.component.html',
})
export class PaletteViewerComponent implements OnInit {

  @Input()
  palette: Palette | undefined

  @Input()
  dark = false

  constructor() { }

  ngOnInit(): void {
  }

}
