import { EventEmitter, Injectable } from '@angular/core'
import { Color } from '../models/color.model'
import { ColorInterpolater } from '../class/color-interpolater'
import { Shade } from '../models/shade.model'
import { PaletteService } from './palette.service'

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private color?: Color
  private shade?: Shade
  private colorChangeEmitter = new EventEmitter<ChangeType>()

  constructor(private paletteService: PaletteService) {}

  /**
   * Open the editor with a copy of the color and optional a specific shade.
   * @param color
   * @param shadeIndex
   */
  loadColor(color: Color, shadeIndex?: number): void {
    this.color = Color.parseColor(color)
    if (shadeIndex) this.shade = this.color.getShade(shadeIndex)
    else this.shade = this.color.shades.find((s) => s.fixed)
    this.colorChangeEmitter.emit(ChangeType.LOAD)
  }

  /**
   * Close the color editor
   */
  closeEditor(): void {
    this.color = undefined
    this.shade = undefined
    this.colorChangeEmitter.emit(ChangeType.LOAD)
  }

  /**
   * Adjust the shades of a color
   */
  adjustShades(): void {
    if (this.color) {
      ColorInterpolater.regenerateShades(this.color)
      this.colorChangeEmitter.emit(ChangeType.ADJUST)
    }
  }

  /**
   * Save all changes made to the color
   */
  saveColor(): void {
    if (this.color) {
      this.paletteService.getPalette()?.replaceColor(this.color)
      this.closeEditor()
    }
  }

  /**
   * Return the current color
   */
  getColor(): Color | undefined {
    return this.color
  }

  /**
   * Return the current shade
   */
  getShade(): Shade | undefined {
    return this.shade
  }

  /**
   * Return the color change event emitter
   */
  getColorChangeEmitter(): EventEmitter<ChangeType> {
    return this.colorChangeEmitter
  }
}

export enum ChangeType {
  LOAD,
  ADJUST,
}
