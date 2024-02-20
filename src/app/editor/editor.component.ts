import { Component, inject, signal } from '@angular/core';
import { PaletteScheme } from '../shared/constants/palette-scheme';
import { ModalService } from '../shared/data-access/modal.service';
import { PaletteService } from '../shared/data-access/palette.service';
import { Color } from '../shared/model/color.model';
import { Palette } from '../shared/model/palette.model';
import { Shade } from '../shared/model/shade.model';
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
  private readonly _paletteService = inject(PaletteService);

  protected readonly palette = signal<Palette | undefined>(undefined);

  constructor() {
    const palette = this._paletteService.generatePalette(
      Shade.random().hex,
      PaletteScheme.RAINBOW
    );

    this.palette.set(palette);
  }

  protected async openColorEditor(color: Color): Promise<void> {
    this._modalService.openModal(EditorColorComponent, {
      // @ts-expect-error
      data: { color, shadeIndex: 0 },
    });
  }
}
