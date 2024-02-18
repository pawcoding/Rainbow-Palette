import { Component, inject, signal } from '@angular/core';
import { ColorService } from '../shared/data-access/color.service';
import { ModalService } from '../shared/data-access/modal.service';
import { Color } from '../shared/model/color.model';
import { Palette } from '../shared/model/palette.model';
import { ModalComponent } from '../shared/ui/modal/modal.component';
import { EditorColorComponent } from './ui/editor-color/editor-color.component';
import { EditorPaletteComponent } from './ui/editor-palette/editor-palette.component';

@Component({
  selector: 'rp-editor',
  standalone: true,
  imports: [EditorPaletteComponent, ModalComponent],
  templateUrl: './editor.component.html',
})
export default class EditorComponent {
  private readonly _modalService = inject(ModalService);
  private readonly _colorService = inject(ColorService);

  protected readonly palette = signal<Palette | undefined>(undefined);

  constructor() {
    const palette = new Palette();

    for (let i = 0; i < 5; i++) {
      const color = Color.random();

      this._colorService.regenerateShades(color);

      palette.colors.push(color);
    }

    this.palette.set(palette);
  }

  protected async openColorEditor(color: Color): Promise<void> {
    this._modalService.openModal(EditorColorComponent, {
      // @ts-expect-error
      data: { color, shadeIndex: 0 },
    });
  }
}
