import { Component, OnInit } from '@angular/core';
import {Palette} from "../../models/palette.model";
import {PaletteService} from "../../services/palette.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {

  palette: Palette | undefined

  constructor(
    private paletteService: PaletteService
  ) {
    paletteService.getPaletteChangeEmitter().subscribe(palette => {
      this.palette = palette
    })
    this.palette = paletteService.getPalette()
  }

  ngOnInit(): void {
  }

}
