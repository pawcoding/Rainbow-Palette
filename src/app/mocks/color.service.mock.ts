import { Color } from '../models/color.model'
import { Signal, signal } from '@angular/core'
import { ColorService } from '../services/color.service'
import { Shade } from '../models/shade.model'

export class ColorServiceMock implements Partial<ColorService> {
  private readonly _color = signal<Color | undefined>(undefined)
  private readonly _shade = signal<Shade | undefined>(undefined)

  public get color(): Signal<Color | undefined> {
    return this._color.asReadonly()
  }

  public get shade(): Signal<Shade | undefined> {
    return this._shade.asReadonly()
  }

  constructor() {
    this._initColor()
  }

  private _initColor(): void {
    window.setTimeout(() => {
      this.loadColor(new Color('pawcode Blue', '#4472c4'))
    }, 500)
  }

  public loadColor(color: Color, shadeIndex?: number): void {
    console.log(`ColorServiceMock.loadColor(${color.name}, ${shadeIndex})`)
    this._color.set(Color.parseColor(color))
    if (shadeIndex) {
      this._shade.set(this._color()?.getShade(shadeIndex))
    } else {
      this._shade.set(
        this._color()?.shades.find((s) => s.fixed) ??
          this._color()?.getShade(500)
      )
    }
  }

  public closeEditor(): void {
    console.log('ColorServiceMock.closeEditor()')
    this._color.set(undefined)
    this._shade.set(undefined)

    this._initColor()
  }

  public adjustShades(): void {
    console.log('ColorServiceMock.adjustShades()')
  }

  public saveColor(): void {
    console.log('ColorServiceMock.saveColor()')
    this._color.set(undefined)
    this._shade.set(undefined)

    this._initColor()
  }
}
