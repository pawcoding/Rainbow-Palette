import {EventEmitter, Injectable} from '@angular/core';
import {Color} from "../models/color.model";

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private color: Color = Color.generateRandomColor()
  private colorChangeEmitter: EventEmitter<ChangeType> = new EventEmitter<ChangeType>()

  constructor() { }

  loadColor(color: Color) {
    this.color = color
    this.colorChangeEmitter.emit(ChangeType.LOAD)
  }

  adjustColor(color: Color) {
    this.color = color
    this.colorChangeEmitter.emit(ChangeType.ADJUST)
  }

  updateColorName(name: string) {
    this.color.name = name
    this.colorChangeEmitter.emit(ChangeType.ADJUST)
  }

  getColor() {
    return this.color
  }

  randomColor() {
    this.color = Color.generateRandomColor()
    this.colorChangeEmitter.emit(ChangeType.RANDOM)
  }

  getColorChangeEmitter() {
    return this.colorChangeEmitter
  }

}

export enum ChangeType {
  LOAD, ADJUST, RANDOM
}
