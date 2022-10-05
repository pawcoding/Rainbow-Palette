import {EventEmitter, Injectable} from '@angular/core';
import {Color} from "../models/color.model";
import {ColorInterpolater} from "../class/color-interpolater";
import {Shade} from "../models/shade.model";
import {PaletteService} from "./palette.service";

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private color: Color | undefined
  private shade: Shade | undefined
  private colorChangeEmitter: EventEmitter<ChangeType> = new EventEmitter<ChangeType>()

  constructor(
    private paletteService: PaletteService
  ) { }

  loadColor(color: Color, shadeIndex?: number) {
    this.color = Color.parseColor(color)
    if (shadeIndex)
      this.shade = this.color.getShade(shadeIndex)
    else
      this.shade = this.color.shades.find(s => s.fixed)
    this.colorChangeEmitter.emit(ChangeType.LOAD)
  }

  closeEditor() {
    this.color = undefined
    this.shade = undefined
    this.colorChangeEmitter.emit(ChangeType.LOAD)
  }

  adjustShade() {
    if (this.color) {
      ColorInterpolater.regenerateShades(this.color)
      this.colorChangeEmitter.emit(ChangeType.ADJUST)
    }
  }

  updateColorName(name: string) {
    if (this.color) {
      this.color.name = name
      this.colorChangeEmitter.emit(ChangeType.ADJUST)
    }
  }

  saveColor() {
    if (this.color) {
      this.paletteService.getPalette()?.replaceColor(this.color)
      this.closeEditor()
    }
  }

  getColor() {
    return this.color
  }

  getShade() {
    return this.shade
  }

  getColorChangeEmitter() {
    return this.colorChangeEmitter
  }

}

export enum ChangeType {
  LOAD, ADJUST
}
