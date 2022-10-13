import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
  color: Color | undefined
  @Input()
  dark = false

  @Output()
  onRemove = new EventEmitter<Color>()

  editingState = false

  @ViewChild('editName')
  editName: ElementRef<HTMLInputElement> | undefined

  constructor(
    public colorService: ColorService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  /**
   * Open editor with the shade with the given index
   * @param shadeIndex
   */
  editShade(shadeIndex: number) {
    if (this.color)
      this.colorService.loadColor(this.color, shadeIndex)
  }

  /**
   * Open color name editor
   */
  openEditor() {
    this.editingState = true
    setTimeout(() => {
      this.editName?.nativeElement.focus()
    }, 0)
  }

  /**
   * Close color name editor
   */
  closeEditor() {
    this.editingState = false
    if (this.color)
      this.color.name = this.editName?.nativeElement.value || 'Random'
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
