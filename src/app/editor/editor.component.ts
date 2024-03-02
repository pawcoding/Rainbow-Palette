import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, computed, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ColorService } from '../shared/data-access/color.service';
import { Color } from '../shared/model/color.model';
import { Shade } from '../shared/model/shade.model';
import { ColorInputComponent } from '../shared/ui/color-input/color-input.component';

@Component({
  selector: 'rp-editor',
  standalone: true,
  imports: [ColorInputComponent, TranslateModule],
  templateUrl: './editor.component.html',
})
export class EditorComponent {
  private readonly _data = inject<{ color: Color; shadeIndex?: number }>(
    DIALOG_DATA
  );
  private readonly _dialogRef = inject(DialogRef);
  private readonly _colorService = inject(ColorService);

  protected readonly color = signal(this._data.color.copy());
  protected readonly shadeIndex = signal(this._data.shadeIndex ?? 0);

  protected readonly shade = computed<Shade>(() => {
    const selectedShade = this.color().shades.find(
      (shade) => shade.index === this.shadeIndex()
    );
    if (selectedShade) {
      return selectedShade;
    }

    const fixedShade = this.color().shades.find((shade) => shade.fixed);
    if (fixedShade) {
      return fixedShade;
    }

    return this.color().shades[0];
  });

  protected readonly lightestShade = computed(() => {
    return this.color().shades[0];
  });

  protected readonly darkestShade = computed(() => {
    const shades = this.color().shades;
    return shades[shades.length - 1];
  });

  protected changeShade(index: number) {
    this.shadeIndex.set(index);
  }

  protected unfixShade(shade: Shade, $event?: MouseEvent) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    if (!shade.fixed) {
      return;
    }

    const atLeastOneFixedLeft = this.color().shades.some(
      (s) => s.fixed && s !== shade
    );

    if (!atLeastOneFixedLeft) {
      return;
    }

    shade.fixed = false;
    this._updateColor();
  }

  protected updateHex(hex: string): void {
    const shade = this.shade();

    shade.hex = hex;
    shade.fixed = true;

    this._updateColor();

    const editedShade = this.color().shades.find((s) => s.hex === hex);
    this.shadeIndex.set(editedShade?.index ?? -1);
  }

  protected cancel(): void {
    this._dialogRef.close(undefined);
  }

  protected save(): void {
    this._dialogRef.close(this.color());
  }

  private _updateColor(): void {
    const updatedColor = this.color().copy();
    this._colorService.regenerateShades(updatedColor);
    this.color.set(updatedColor);
  }
}
