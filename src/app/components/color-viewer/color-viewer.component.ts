import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Color} from "../../models/color.model";
import {ColorService} from "../../services/color.service";
import {Shade} from "../../models/shade.model";
import {ToUnicodeVariantUtil} from "../../utils/to-unicode-variant.util";

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
    public colorService: ColorService
  ) {
    this.color = Color.generateRandomColor()
  }

  ngOnInit(): void {
  }

  /**
   * Copy a shades hex to clipboard.
   * @param shade
   */
  copyToClipboard(shade: Shade) {
    navigator.clipboard.writeText(shade.hex).then(() => {
      alert(`${ToUnicodeVariantUtil.toUnicodeVariant(shade.hex, 'bs')} copied to clipboard.`)
    }).catch(e => {
      console.error('Error while copying to clipboard', e)
    })
  }

}
