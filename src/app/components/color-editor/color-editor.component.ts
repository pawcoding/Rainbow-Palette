import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Color} from "../../models/color.model";
import {Shade} from "../../models/shade.model";
import {ChangeType, ColorService} from "../../services/color.service";

@Component({
  selector: 'color-editor',
  templateUrl: './color-editor.component.html',
  styleUrls: ['./color-editor.component.css']
})
export class ColorEditorComponent implements OnInit {

  @Input()
  dark = false

  @Output()
  addColor = new EventEmitter<Color>()

  shade: Shade
  state: EditorState = EditorState.ADD

  constructor(
    public colorService: ColorService
  ) {
    this.shade = this.colorService.getColor().getShade(500)

    this.colorService.getColorChangeEmitter().subscribe(changeType => {
      if (changeType !== ChangeType.ADJUST) {
        this.shade = this.colorService.getColor().getShade(500)
        this.state = changeType === ChangeType.RANDOM ? EditorState.ADD : EditorState.EDIT
      }
      this.updateProperties()
    })
  }

  ngOnInit(): void {
    if (document.body.classList.contains('dark'))
      this.dark = true

    this.updateProperties()
  }

  /**
   * Update current shade. The property with type is changed to the new value.
   * @param type Property to change
   * @param value Value to change to
   */
  updateColor(type: UpdateType, value: string | number) {
    if (type === UpdateType.HEX && isNaN(+value)) {
      this.shade = new Shade(0, `${value}`)
    } else if (!isNaN(+value)) {
      value = parseInt(`${value}`)
      if (type === UpdateType.HUE) {
        this.shade = new Shade(0, value, this.shade.saturation, this.shade.luminosity)
      } else if (type === UpdateType.SATURATION) {
        this.shade = new Shade(0, this.shade.hue, value, this.shade.luminosity)
      } else if (type === UpdateType.LUMINOSITY) {
        this.shade = new Shade(0, this.shade.hue, this.shade.saturation, 100 - value)
      }
    }

    this.updateProperties()
  }

  adjustColor() {
    this.colorService.adjustColor(
      new Color(this.colorService.getColor().name, this.shade.hex)
    )
  }

  /**
   * Update all css properties to the values of the current selected shade
   */
  updateProperties() {
    document.documentElement.style.setProperty('--selected-hex', this.shade.hex)
    document.documentElement.style.setProperty('--selected-hue', String(this.shade.hue))
    document.documentElement.style.setProperty('--selected-saturation', this.shade.saturation + "%")
    document.documentElement.style.setProperty('--selected-luminosity', this.shade.luminosity + "%")
  }

  /**
   * Update the name of the current color
   * @param name
   */
  updateName(name: string) {
    this.colorService.updateColorName(name)
  }

}

enum UpdateType {
  HEX, HUE, SATURATION, LUMINOSITY
}

enum EditorState {
  ADD, EDIT
}
