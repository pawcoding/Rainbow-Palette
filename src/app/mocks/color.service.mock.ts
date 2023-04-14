import { Color } from '../models/color.model'
import { EventEmitter } from '@angular/core'
import { ChangeType, ColorService } from '../services/color.service'
import { Shade } from '../models/shade.model'

export class ColorServiceMock implements Partial<ColorService> {
  private color?: Color
  private shade?: Shade
  private colorChangeEmitter = new EventEmitter<ChangeType>()

  constructor() {
    this.initColor()
  }

  initColor(): void {
    window.setTimeout(() => {
      this.loadColor(new Color('pawcode Blue', '#4472c4'))
    }, 500)
  }

  loadColor(color: Color, shadeIndex?: number): void {
    console.log(`ColorServiceMock.loadColor(${color.name}, ${shadeIndex})`)
    this.color = Color.parseColor(color)
    const newShadeIndex =
      shadeIndex ?? this.color.shades.find((s) => s.fixed)?.index ?? 500
    this.shade = this.color.getShade(newShadeIndex)
    this.colorChangeEmitter.emit(ChangeType.LOAD)
  }

  closeEditor(): void {
    console.log('ColorServiceMock.closeEditor()')
    this.color = undefined
    this.shade = undefined
    this.colorChangeEmitter.emit(ChangeType.LOAD)

    this.initColor()
  }

  adjustShades(): void {
    console.log('ColorServiceMock.adjustShades()')
    this.colorChangeEmitter.emit(ChangeType.ADJUST)
  }

  saveColor(): void {
    console.log('ColorServiceMock.saveColor()')
    this.color = undefined
    this.shade = undefined
    this.colorChangeEmitter.emit(ChangeType.LOAD)

    this.initColor()
  }

  getColor(): Color | undefined {
    console.log('ColorServiceMock.getColor()')
    return this.color
  }

  getShade(): Shade | undefined {
    console.log('ColorServiceMock.getShade()')
    return this.shade
  }

  getColorChangeEmitter(): EventEmitter<ChangeType> {
    console.log('ColorServiceMock.getColorChangeEmitter()')
    return this.colorChangeEmitter
  }
}
