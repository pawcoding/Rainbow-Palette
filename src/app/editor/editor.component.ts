import { Component, signal } from '@angular/core';
import { PaletteComponent } from './ui/palette/palette.component';
import { Palette } from '../shared/model/palette.model';

@Component({
  selector: 'rp-editor',
  standalone: true,
  imports: [PaletteComponent],
  templateUrl: './editor.component.html',
})
export default class EditorComponent {
  protected readonly palette = signal<Palette>(new Palette());
}
