import {Component, Input, OnInit} from '@angular/core';
import {Color} from "../../models/color.model";
import {Shade} from "../../models/shade.model";
import {ChangeType, ColorService} from "../../services/color.service";
import {ToUnicodeVariantUtil} from "../../utils/to-unicode-variant.util";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'color-editor',
  templateUrl: './color-editor.component.html',
  styleUrls: ['./color-editor.component.css']
})
export class ColorEditorComponent implements OnInit {

  @Input()
  dark = false

  shade: Shade | undefined
  color: Color | undefined

  constructor(
    public colorService: ColorService,
    private notificationService: NotificationService
  ) {
    this.colorService.getColorChangeEmitter().subscribe(changeType => {
      if (changeType === ChangeType.LOAD) {
        this.color = this.colorService.getColor()
        this.shade = this.colorService.getShade()
      }

      this.updateProperties()
    })
  }

  ngOnInit(): void {
    this.updateProperties()
  }

  /**
   * Update current shade. The property with type is changed to the new value.
   * @param type Property to change
   * @param value Value to change to
   */
  updateColor(type: UpdateType, value: string | number) {
    if (!this.shade)
      return

    if (type === UpdateType.HEX && isNaN(+value)) {
      this.shade.setHEX(`${value}`, true)
    } else if (!isNaN(+value)) {
      value = parseInt(`${value}`)
      if (type === UpdateType.HUE)
        this.shade.setHSL(this.wheelToHue(value), this.shade.saturation, this.shade.luminosity, true)
      else if (type === UpdateType.SATURATION)
        this.shade.setHSL(this.shade.hue, value, this.shade.luminosity, true)
      else if (type === UpdateType.LUMINOSITY)
        this.shade.setHSL(this.shade.hue, this.shade.saturation, 100 - value, true)
    }

    this.colorService.adjustShade()
  }

  /**
   * Update all css properties to the values of the current selected shade.
   */
  updateProperties() {
    if (!this.shade)
      return

    document.documentElement.style.setProperty('--selected-hex', this.shade.hex)
    document.documentElement.style.setProperty('--selected-hue', String(this.shade.hue))
    document.documentElement.style.setProperty('--selected-saturation', this.shade.saturation + "%")
    document.documentElement.style.setProperty('--selected-luminosity', this.shade.luminosity + "%")
  }

  /**
   * Update the name of the current color.
   * @param name
   */
  updateName(name: string) {
    this.colorService.updateColorName(name)
  }

  changeShade(shade: Shade) {
    if (this.color)
      this.colorService.loadColor(this.color, shade)
  }

  releaseShade(shade: Shade, $event: MouseEvent) {
    $event.preventDefault()
    if (!this.color)
      return

    if (this.color.shades.filter(s => s.fixed).length > 1) {
      shade.fixed = false
      this.colorService.adjustShade()
    }
  }

  /**
   * Copy a shades hex to clipboard.
   * @param shade
   */
  copyToClipboard(shade: Shade) {
    navigator.clipboard.writeText(shade.hex).then(() => {
      this.notificationService.notification.emit(`Copied "${ToUnicodeVariantUtil.toUnicodeVariant(shade.hex, 'm')}" to your clipboard`)
    }).catch(e => {
      console.error('Error while copying to clipboard', e)
    })
  }

  wheelToHue(wheel: number) {
    let newHue
    if (wheel < 120)
      newHue = .5 * wheel
    else if (wheel < 180)
      newHue = wheel + 300
    else if (wheel < 240)
      newHue = 2 * wheel + 120
    else
      newHue = wheel

    return newHue % 360
  }

  hueToWheel(hue: number) {
    let wheel
    if (hue < 60)
      wheel = 2 * hue
    else if (hue < 120)
      wheel = hue + 60
    else if (hue < 240)
      wheel = .5 * hue + 120
    else
      wheel = hue

    return wheel % 360
  }

}

enum UpdateType {
  HEX, HUE, SATURATION, LUMINOSITY
}
