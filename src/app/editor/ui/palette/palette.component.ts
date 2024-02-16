import { Component, model } from '@angular/core';
import { ColorComponent } from '../color/color.component';
import { Palette } from '../../../shared/model/palette.model';

@Component({
  selector: 'rp-palette',
  standalone: true,
  imports: [ColorComponent],
  templateUrl: './palette.component.html',
})
export class PaletteComponent {
  public readonly palette = model.required<Palette>();
}
