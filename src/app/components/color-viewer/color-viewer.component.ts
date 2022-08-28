import {Component, Input, OnInit} from '@angular/core';
import {Color} from "../../models/color.model";

@Component({
  selector: 'app-color-viewer',
  templateUrl: './color-viewer.component.html',
  styleUrls: ['./color-viewer.component.css']
})
export class ColorViewerComponent implements OnInit {

  @Input()
  color: Color | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
