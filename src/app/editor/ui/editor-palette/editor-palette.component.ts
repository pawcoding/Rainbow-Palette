import { Component, model } from '@angular/core';
import { Palette } from '../../../shared/model/palette.model';

@Component({
  selector: 'rp-editor-palette',
  standalone: true,
  templateUrl: './editor-palette.component.html',
})
export class EditorPaletteComponent {
  public readonly palette = model.required<Palette>();
}
