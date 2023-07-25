import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
} from '@angular/core'
import { Color } from '../../models/color.model'
import { ColorService } from '../../services/color.service'
import { Shade } from '../../models/shade.model'
import { toUnicodeVariant } from '../../utils/to-unicode-variant.util'
import { NotificationService } from '../../services/notification.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-color-viewer',
  templateUrl: './color-viewer.component.html',
})
export class ColorViewerComponent {
  private readonly _translate = inject(TranslateService)
  private readonly _notificationService = inject(NotificationService)
  protected readonly colorService = inject(ColorService)

  @Input()
  public color: Color | undefined
  @Input()
  public dark = false

  @Output()
  public onRemove = new EventEmitter<Color>()

  protected editingState = false

  @ViewChild('editName')
  protected editName: ElementRef<HTMLInputElement> | undefined

  /**
   * Open editor with the shade with the given index
   * @param shadeIndex
   */
  protected editShade(shadeIndex: number) {
    if (this.color) this.colorService.loadColor(this.color, shadeIndex)
  }

  /**
   * Open color name editor
   */
  protected openEditor() {
    this.editingState = true
    setTimeout(() => {
      this.editName?.nativeElement.focus()
    }, 0)
  }

  /**
   * Close color name editor
   */
  protected closeEditor() {
    this.editingState = false
    if (this.color)
      this.color.name =
        this.editName?.nativeElement.value || this._translate.instant('random')
  }

  /**
   * Copy a shades hex to clipboard.
   * @param shade
   * @param $event
   */
  protected copyToClipboard(shade: Shade, $event: MouseEvent) {
    $event.preventDefault()
    navigator.clipboard
      .writeText(shade.hex)
      .then(() => {
        this._notificationService.openNotification({
          id: 'copied',
          interpolateParams: {
            color: toUnicodeVariant(shade.hex, 'm'),
          },
        })
      })
      .catch((e) => {
        console.error('Error while copying to clipboard: ', e)
        this._notificationService.openNotification('copy-error')
      })
  }
}
