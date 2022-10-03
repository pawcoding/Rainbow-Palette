import {EventEmitter, Injectable} from '@angular/core';
import {Color} from "../models/color.model";
import {ColorInterpolater} from "../class/color-interpolater";
import {Shade} from "../models/shade.model";

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private color: Color | undefined
  private shade: Shade | undefined
  private colorChangeEmitter: EventEmitter<ChangeType> = new EventEmitter<ChangeType>()

  constructor() { }

  loadColor(color: Color, shade?: Shade) {
    this.color = color
    this.shade = shade || this.color.shades.find(s => s.fixed)
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
