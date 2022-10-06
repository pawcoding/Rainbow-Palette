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

  /**
   * Open the editor with a copy of the color and optional a specific shade.
   * @param color
   * @param shadeIndex
   */
  loadColor(color: Color, shadeIndex?: number) {
    this.color = Color.parseColor(color)
    if (shadeIndex)
      this.shade = this.color.getShade(shadeIndex)
    else
      this.shade = this.color.shades.find(s => s.fixed)
    this.colorChangeEmitter.emit(ChangeType.LOAD)
  }

  /**
   * Close the color editor
   */
  closeEditor() {
    this.color = undefined
    this.shade = undefined
    this.colorChangeEmitter.emit(ChangeType.LOAD)
  }

  /**
   * Adjust the shades of a color
   */
  adjustShades() {
    if (this.color) {
      ColorInterpolater.regenerateShades(this.color)
      this.colorChangeEmitter.emit(ChangeType.ADJUST)
    }
  }

  /**
   * Save all changes made to the color
   */
  saveColor() {
    if (this.color) {
      this.paletteService.getPalette()?.replaceColor(this.color)
      this.closeEditor()
    }
  }

  /**
   * Return the current color
   */
  getColor() {
    return this.color
  }

  /**
   * Return the current shade
   */
  getShade() {
    return this.shade
  }

  /**
   * Return the color change event emitter
   */
  getColorChangeEmitter() {
    return this.colorChangeEmitter
  }

}

export enum ChangeType {
  LOAD, ADJUST
}
