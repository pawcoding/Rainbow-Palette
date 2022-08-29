import {Component, Input, OnInit} from '@angular/core';
import {Color} from "../../models/color.model";

@Component({
  selector: 'app-color-viewer',
  templateUrl: './color-viewer.component.html',
})
export class ColorViewerComponent implements OnInit {

  @Input()
  color: Color | undefined

  @Input()
  dark = false

  constructor() {
    if (document.getElementById('body')?.classList.contains('dark'))
      this.dark = true
  }

  ngOnInit(): void {
  }

}
