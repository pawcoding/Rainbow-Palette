import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Color} from "../../models/color.model";
import {ColorService} from "../../services/color.service";
import {Shade} from "../../models/shade.model";
import {toUnicodeVariant} from "../../utils/to-unicode-variant.util";
import {NotificationService} from "../../services/notification.service";
import {TranslateService} from "@ngx-translate/core";

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
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {
  }

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
      this.color.name = this.editName?.nativeElement.value || this.translate.instant('random')
  }

  /**
   * Copy a shades hex to clipboard.
   * @param shade
   * @param $event
   */
  copyToClipboard(shade: Shade, $event: MouseEvent) {
    $event.preventDefault()
    navigator.clipboard.writeText(shade.hex).then(() => {
      this.notificationService.notification.emit({
        id: 'copied',
        interpolateParams: {
          color: toUnicodeVariant(shade.hex, 'm')
        }
      })
    }).catch(e => {
      console.error('Error while copying to clipboard: ', e)
      this.notificationService.notification.emit('copy-error')
    })
  }

}
