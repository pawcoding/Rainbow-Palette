import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Color} from "../../models/color.model";

@Component({
  selector: 'color-viewer',
  templateUrl: './color-viewer.component.html',
})
export class ColorViewerComponent implements OnInit {

  @Input()
  color: Color | undefined

  @Input()
  dark = false

  @Input()
  inPalette = false

  @Output()
  onRemove = new EventEmitter<Color>()

  @Output()
  onEdit = new EventEmitter<Color>()

  ngOnInit(): void {
    if (document.getElementById('body')?.classList.contains('dark'))
      this.dark = true
  }

}
