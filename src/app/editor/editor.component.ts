import { Component, inject } from '@angular/core';
import { ModalService } from '../shared/data-access/modal.service';
import { PaletteService } from '../shared/data-access/palette.service';
import { Color } from '../shared/model/color.model';
import { ModalComponent } from '../shared/ui/modal/modal.component';
import { NoPaletteComponent } from '../shared/ui/no-palette/no-palette.component';
import { EditorColorComponent } from './ui/editor-color/editor-color.component';
import { EditorPaletteComponent } from './ui/editor-palette/editor-palette.component';

@Component({
  selector: 'rp-editor',
  standalone: true,
  imports: [EditorPaletteComponent, ModalComponent, NoPaletteComponent],
  templateUrl: './editor.component.html',
})
export default class EditorComponent {
  private readonly _modalService = inject(ModalService);
  private readonly _paletteService = inject(PaletteService);

  protected readonly palette = this._paletteService.palette;

  protected async openColorEditor(color: Color): Promise<void> {
    this._modalService.openModal(EditorColorComponent, {
      // @ts-expect-error
      data: { color, shadeIndex: 0 },
    });
  }
}
