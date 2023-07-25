import { Component, Input, computed, effect, inject } from '@angular/core'
import { Shade } from '../../models/shade.model'
import { ColorService } from '../../services/color.service'

@Component({
  selector: 'app-color-editor',
  templateUrl: './color-editor.component.html',
  styleUrls: ['./color-editor.component.css'],
})
export class ColorEditorComponent {
  protected readonly colorService = inject(ColorService)

  @Input()
  public dark = false

  protected readonly shade = this.colorService.shade
  protected readonly color = this.colorService.color

  protected readonly hue = computed(() => {
    const shade = this.shade()
    if (!shade) return 0

    return this.hueToWheel(shade.hue)
  })

  constructor() {
    // Prevent scrolling when the editor is open
    effect(() => {
      if (this.color()) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    })

    // Update CSS variables when the shade changes
    effect(() => {
      const shade = this.shade()
      if (!shade) return

      document.documentElement.style.setProperty('--selected-hex', shade.hex)
      document.documentElement.style.setProperty(
        '--selected-hue',
        String(shade.hue)
      )
      document.documentElement.style.setProperty(
        '--selected-saturation',
        shade.saturation + '%'
      )
      document.documentElement.style.setProperty(
        '--selected-luminosity',
        shade.luminosity + '%'
      )
    })
  }

  /**
   * Update current shade. The property with type is changed to the new value.
   * @param type Property to change
   * @param value Value to change to
   */
  protected updateColor(type: UpdateType, value: string | number) {
    if (!this.shade()) return

    if (type === UpdateType.HEX && isNaN(+value)) {
      if (`${value}`.match(/^#[0-9A-Fa-f]{6}$/)) {
        this.colorService.updateShade(`${value}`)
      } else {
        return
      }
    } else if (!isNaN(+value)) {
      const oldShade = this.shade()!
      value = parseInt(`${value}`)
      if (type === UpdateType.HUE) {
        this.colorService.updateShade(
          this.wheelToHue(value),
          oldShade.saturation,
          oldShade.luminosity
        )
      } else if (type === UpdateType.SATURATION) {
        this.colorService.updateShade(oldShade.hue, value, oldShade.luminosity)
      } else if (type === UpdateType.LUMINOSITY) {
        this.colorService.updateShade(
          oldShade.hue,
          oldShade.saturation,
          100 - value
        )
      }
    }
  }

  /**
   * Change a shade to be edited
   * @param shadeIndex
   */
  protected changeShade(shadeIndex: number) {
    const color = this.color()
    if (color) {
      this.colorService.loadColor(color, shadeIndex)
    }
  }

  /**
   * Release a shade and let it be interpolated instead
   * @param shade
   * @param $event
   */
  protected releaseShade(shade: Shade, $event: MouseEvent) {
    $event.preventDefault()
    const color = this.color()
    if (!color) return

    if (color.shades.filter((s) => s.fixed).length > 1) {
      shade.fixed = false
      this.colorService.adjustShades(true)
    }
  }

  /**
   * Calculate from color wheel degree to hue
   * @param wheel
   */
  private wheelToHue(wheel: number) {
    let newHue
    if (wheel < 120) newHue = 0.5 * wheel
    else if (wheel < 180) newHue = wheel + 300
    else if (wheel < 240) newHue = 2 * wheel + 120
    else newHue = wheel

    return newHue % 360
  }

  /**
   * Calculate from hue to color wheel degree
   * @param hue
   */
  private hueToWheel(hue: number) {
    let wheel
    if (hue < 60) wheel = 2 * hue
    else if (hue < 120) wheel = hue + 60
    else if (hue < 240) wheel = 0.5 * hue + 120
    else wheel = hue

    return wheel % 360
  }
}

enum UpdateType {
  HEX,
  HUE,
  SATURATION,
  LUMINOSITY,
}
