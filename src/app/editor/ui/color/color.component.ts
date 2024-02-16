import { Component, model } from '@angular/core';
import { Color } from '../../../shared/model/color.model';

@Component({
  selector: 'rp-color',
  standalone: true,
  imports: [],
  templateUrl: './color.component.html',
})
export class ColorComponent {
  public readonly color = model.required<Color>();
}
