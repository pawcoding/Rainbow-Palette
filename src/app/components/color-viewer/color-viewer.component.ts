import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Color} from "../../models/color.model";
import {ColorService} from "../../services/color.service";
import {Shade} from "../../models/shade.model";
import {ToUnicodeVariantUtil} from "../../utils/to-unicode-variant.util";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'color-viewer',
  templateUrl: './color-viewer.component.html',
})
export class ColorViewerComponent implements OnInit {

  @Input()
  color: Color
  @Input()
  dark = false

  @Output()
  onRemove = new EventEmitter<Color>()

  constructor(
    public colorService: ColorService,
    private notificationService: NotificationService
  ) {
    this.color = Color.generateRandomColor()
  }

  ngOnInit(): void {
  }

  changeShade(shadeIndex: number) {
    if (this.color)
      this.colorService.loadColor(this.color, shadeIndex)
  }

  /**
   * Copy a shades hex to clipboard.
   * @param shade
   * @param $event
   */
  copyToClipboard(shade: Shade, $event: MouseEvent) {
    $event.preventDefault()
    navigator.clipboard.writeText(shade.hex).then(() => {
      this.notificationService.notification.emit(`Copied "${ToUnicodeVariantUtil.toUnicodeVariant(shade.hex, 'm')}" to your clipboard.`)
    }).catch(e => {
      console.error('Error while copying to clipboard', e)
    })
  }

}
