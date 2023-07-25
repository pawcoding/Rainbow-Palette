import { Color } from '../models/color.model'
import { Signal, signal } from '@angular/core'
import { ChangeType, ColorService } from '../services/color.service'
import { Shade } from '../models/shade.model'

export class ColorServiceMock implements Partial<ColorService> {
  private readonly _color = signal<Color | undefined>(undefined)
  private readonly _shade = signal<Shade | undefined>(undefined)
  private readonly _state = signal<ChangeType>(ChangeType.EXIT)

  public get color(): Signal<Color | undefined> {
    return this._color.asReadonly()
  }

  public get shade(): Signal<Shade | undefined> {
    return this._shade.asReadonly()
  }

  public get state(): Signal<ChangeType> {
    return this._state.asReadonly()
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
    this._state.set(ChangeType.LOAD)
  }

  public closeEditor(): void {
    console.log('ColorServiceMock.closeEditor()')
    this._color.set(undefined)
    this._shade.set(undefined)
    this._state.set(ChangeType.EXIT)

    this._initColor()
  }

  public adjustShades(): void {
    console.log('ColorServiceMock.adjustShades()')
    this._state.set(ChangeType.ADJUST)
  }

  public saveColor(): void {
    console.log('ColorServiceMock.saveColor()')
    this._color.set(undefined)
    this._shade.set(undefined)
    this._state.set(ChangeType.EXIT)

    this._initColor()
  }
}
