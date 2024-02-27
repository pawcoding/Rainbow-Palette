import { Component, computed, inject, signal } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import {
  heroArrowPathMini,
  heroBookmarkMini,
  heroPencilSquareMini,
  heroPlusMini,
} from '@ng-icons/heroicons/mini';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { string_to_unicode_variant as toUnicodeVariant } from 'string-to-unicode-variant';
import { ColorService } from '../shared/data-access/color.service';
import { ModalService } from '../shared/data-access/modal.service';
import { PaletteService } from '../shared/data-access/palette.service';
import { ToastService } from '../shared/data-access/toast.service';
import { Color } from '../shared/model/color.model';
import { Shade } from '../shared/model/shade.model';
import { ModalComponent } from '../shared/ui/modal/modal.component';
import { NoPaletteComponent } from '../shared/ui/no-palette/no-palette.component';
import { EditorColorComponent } from './ui/editor-color/editor-color.component';
import { EditorPaletteComponent } from './ui/editor-palette/editor-palette.component';

@Component({
  selector: 'rp-editor',
  standalone: true,
  imports: [
    EditorPaletteComponent,
    ModalComponent,
    NoPaletteComponent,
    NgIconComponent,
    TranslateModule,
  ],
  templateUrl: './editor.component.html',
})
export default class EditorComponent {
  private readonly _modalService = inject(ModalService);
  private readonly _toastService = inject(ToastService);
  private readonly _paletteService = inject(PaletteService);
  private readonly _colorService = inject(ColorService);
  private readonly _translateService = inject(TranslateService);

  protected readonly heroPencilSquareMini = heroPencilSquareMini;
  protected readonly heroPlusMini = heroPlusMini;

  protected readonly palette = this._paletteService.palette;
  protected readonly saving = signal(false);

  protected readonly saveIcon = computed(() => {
    if (this.saving()) {
      return heroArrowPathMini;
    } else {
      return heroBookmarkMini;
    }
  });

  protected renamePalette(): void {
    const palette = this.palette();
    if (!palette) {
      return;
    }

    const newName = window.prompt(
      this._translateService.instant('editor.palette.rename'),
      palette.name
    );

    if (!newName || newName === palette.name) {
      return;
    }

    if (newName) {
      palette.name = newName;
    }

    this._toastService.showToast({
      type: 'success',
      message: 'editor.palette.renamed',
      parameters: { name: newName },
    });
  }

  protected savePalette(): void {
    if (this.saving()) {
      return;
    }

    this.saving.set(true);

    this._paletteService.savePaletteToLocalStorage();

    setTimeout(() => {
      this.saving.set(false);
      this._toastService.showToast({
        type: 'success',
        message: 'editor.palette.saved',
      });
    }, 3000);
  }

  protected renameColor(color: Color): void {
    const newName = window.prompt(
      this._translateService.instant('editor.color.rename'),
      color.name
    );

    if (!newName || newName === color.name) {
      return;
    }

    if (newName) {
      color.name = newName;
    }

    this._toastService.showToast({
      type: 'success',
      message: 'editor.color.renamed',
      parameters: { name: newName },
    });
  }

  protected async editColor(color: Color, shadeIndex?: number): Promise<void> {
    this._modalService.openModal(EditorColorComponent, {
      // @ts-expect-error
      data: { color, shadeIndex },
    });
  }

  protected removeColor(color: Color): void {
    const name = color.name;
    if (
      window.confirm(
        this._translateService.instant('editor.color.remove', {
          color: name,
        })
      )
    ) {
      this.palette()?.removeColor(color);

      this._toastService.showToast({
        type: 'info',
        message: 'editor.color.removed',
        parameters: { color: name },
      });
    }
  }

  protected async addColor(): Promise<void> {
    const palette = this.palette();
    if (!palette) {
      return;
    }

    const color = await this._colorService.randomColor();
    palette.addColor(color);
  }

  protected async copyToClipboard(shade: Shade): Promise<void> {
    try {
      await navigator.clipboard.writeText(shade.hex);

      this._toastService.showToast({
        type: 'success',
        message: 'editor.color.copy.success',
        parameters: { color: toUnicodeVariant(shade.hex, 'm') },
      });
    } catch (error) {
      console.error('Error copying to clipboard', error);
      this._toastService.showToast({
        type: 'error',
        message: 'editor.color.copy.error',
      });
    }
  }
}
