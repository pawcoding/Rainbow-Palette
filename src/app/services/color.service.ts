import { Injectable, Signal, inject, signal } from '@angular/core'
import { Color } from '../models/color.model'
import { ColorInterpolater } from '../class/color-interpolater'
import { Shade } from '../models/shade.model'
import { PaletteService } from './palette.service'

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private readonly _paletteService = inject(PaletteService)

  private readonly _color = signal<Color | undefined>(undefined)
  private readonly _shade = signal<Shade | undefined>(undefined)

  public get color(): Signal<Color | undefined> {
    return this._color.asReadonly()
  }

  public get shade(): Signal<Shade | undefined> {
    return this._shade.asReadonly()
  }

  /**
   * Open the editor with a copy of the color and optionally a specific shade.
   * @param color
   * @param shadeIndex
   */
  public loadColor(color: Color, shadeIndex?: number): void {
    this._color.set(Color.parseColor(color))
    if (shadeIndex) {
      this._shade.set(this._color()?.getShade(shadeIndex))
    } else {
      this._shade.set(this._color()?.shades.find((s) => s.fixed))
    }
  }

  /**
   * Close the color editor
   */
  public closeEditor(): void {
    this._color.set(undefined)
    this._shade.set(undefined)
  }

  public updateShade(
    hueOrHex: string | number,
    saturation?: number,
    luminosity?: number
  ): void {
    this._shade.mutate((shade) => {
      if (shade) {
        if (typeof hueOrHex === 'string') {
          shade.setHEX(hueOrHex)
        } else if (saturation && luminosity) {
          shade.setHSL(hueOrHex, saturation, luminosity, true)
        }
      }
    })
    this.adjustShades()
  }

  /**
   * Adjust the shades of a color
   */
  public adjustShades(setNewShade?: boolean): void {
    const color = this._color()
    if (color) {
      ColorInterpolater.regenerateShades(color)
      if (setNewShade) {
        this._shade.set(
          color.shades.find((s) => s.fixed) ?? color.getShade(500)
        )
      }
    }
  }

  /**
   * Save all changes made to the color
   */
  public saveColor(): void {
    const color = this.color()
    if (color) {
      this._paletteService.palette()?.replaceColor(color)
      this.closeEditor()
    }
  }
}
