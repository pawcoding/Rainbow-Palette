import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Color} from "../../models/color.model";
import {Shade} from "../../models/shade.model";

@Component({
  selector: 'color-editor',
  templateUrl: './color-editor.component.html',
  styleUrls: ['./color-editor.component.css']
})
export class ColorEditorComponent implements OnInit {

  @Input()
  color: Color | undefined

  @Input()
  editColor: EventEmitter<Color> | undefined

  shade: Shade

  @Input()
  dark = false

  @Output()
  onAdd = new EventEmitter<Color>()

  constructor() {
    if (this.color === undefined)
      this.color = Color.generateRandomColor()
    this.shade = this.color.getShade(500)
  }

  ngOnInit(): void {
    if (document.body.classList.contains('dark'))
      this.dark = true

    this.updateProperties()

    if (this.editColor !== undefined)
      this.editColor.subscribe(c => this.setColor(c))
  }

  /**
   * Set the current color to edit
   * @param color
   */
  setColor(color: Color) {
    this.color = color
    this.shade = color.getShade(500)

    this.updateProperties()
  }

  /**
   * Update current shade. The property with type is changed to the new value.
   * @param type Property to change
   * @param value Value to change to
   */
  updateColor(type: ChangeType, value: string | number) {
    if (type === ChangeType.HEX && isNaN(+value)) {
      this.shade = new Shade(0, `${value}`)
    } else if (!isNaN(+value)) {
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

    this.color = new Color(this.color?.name || this.shade.hex, this.shade.hex)
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
   * Update the name of the current color
   * @param name
   */
  updateName(name: string) {
    if (this.color)
      this.color.name = name
  }

}


export enum ChangeType {
  HEX, HUE, SATURATION, LUMINOSITY
}
