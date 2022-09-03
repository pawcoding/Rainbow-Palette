import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Shade} from "../../models/shade.model";
import {Color} from "../../models/color.model";

@Component({
  selector: 'shade-picker',
  templateUrl: './shade-picker.component.html',
  styleUrls: ['./shade-picker.component.css']
})
export class ShadePickerComponent implements OnInit {

  @Input()
  shade: Shade | undefined

  @Input()
  dark = false

  @Input()
  name = ''

  @Output()
  colorEmitter = new EventEmitter<Color>()

  ngOnInit(): void {
    if (document.getElementById('body')?.classList.contains('dark'))
      this.dark = true

    this.updateProperties()
  }

  /**
   * Update current shade. The property with type is changed to the new value.
   * @param type Property to change
   * @param value Value to change to
   */
  updateShade(type: ChangeType, value: string | number): void {
    if (type === ChangeType.HEX && isNaN(+value))
      this.shade = new Shade(0, `${value}`)
    else if (!isNaN(+value)) {
      if (type === ChangeType.HUE) {
        // @ts-ignore
        this.shade = new Shade(0, value, this.shade?.saturation, this.shade?.luminosity)
      } else if (type === ChangeType.SATURATION) {
        // @ts-ignore
        this.shade = new Shade(0, this.shade?.hue, value, this.shade?.luminosity)
      } else if (type === ChangeType.LUMINOSITY) {
        // @ts-ignore
        this.shade = new Shade(0, this.shade?.hue, this.shade?.saturation, 100 - value)
      }
    }

    this.updateProperties()
  }

  /**
   * Update all css properties to the values of the current selected shade
   */
  updateProperties() {
    if (this.shade) {
      document.documentElement.style.setProperty('--selected-hex', this.shade.hex)
      document.documentElement.style.setProperty('--selected-hue', String(this.shade.hue))
      document.documentElement.style.setProperty('--selected-saturation', this.shade.saturation + "%")
      document.documentElement.style.setProperty('--selected-luminosity', this.shade.luminosity + "%")
    }
  }

  /**
   * Update the name of the current color / shade
   * @param name
   */
  updateName(name: string) {
    this.name = name
  }

  /**
   * Generate all shades for the current color.
   */
  generateColor() {
    if (this.shade)
      this.colorEmitter.emit(new Color(this.name || this.shade.hex, this.shade.hex))
  }

}


export enum ChangeType {
  HEX, HUE, SATURATION, LUMINOSITY
}
