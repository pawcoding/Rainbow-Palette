import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Color} from "../../models/color.model";
import {ColorService} from "../../services/color.service";

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
    if (document.getElementById('body')?.classList.contains('dark'))
      this.dark = true
  }

}
