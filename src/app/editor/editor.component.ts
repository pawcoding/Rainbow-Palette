import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { DecimalPipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ColorService } from '../shared/data-access/color.service';
import { Color, Shade } from '../shared/model';
import { ColorInputComponent } from '../shared/ui/color-input/color-input.component';
import { ColorRangeSliderComponent } from '../shared/ui/color-range-slider/color-range-slider.component';
import { textColor } from '../shared/utils/text-color';

/**
 * Data for the editor dialog.
 */
export type EditorData = {
  /**
   * Color to edit.
   */
  color: Color;
  /**
   * Shade to open the editor with.
   */
  shadeIndex?: number;
};

export enum UpdateType {
  HEX = 'hex',
  HUE = 'hue',
  SATURATION = 'saturation',
  LIGHTNESS = 'lightness'
}

@Component({
  selector: 'rp-editor',
  standalone: true,
  imports: [ColorInputComponent, TranslateModule, DecimalPipe, ColorRangeSliderComponent],
  templateUrl: './editor.component.html',
  host: {
    '[style.--editor-saturation]': 'shade().hsl.S + "%"',
    '[style.--editor-lightness]': 'shade().hsl.L + "%"',
    '[style.--editor-hue]': 'shade().hsl.H'
  }
})
export class EditorComponent {
  protected readonly UpdateType = UpdateType;
  protected readonly textColor = textColor;

  readonly #data = inject<EditorData>(DIALOG_DATA);
  readonly #dialogRef = inject(DialogRef);
  readonly #colorService = inject(ColorService);
  readonly #translateService = inject(TranslateService);

  protected readonly color = signal(this.#data.color.copy());
  protected readonly shadeIndex = signal(this.#data.shadeIndex ?? 0);

  protected readonly shade = computed<Shade>(() => {
    const selectedShade = this.color().shades.find((shade) => shade.index === this.shadeIndex());
    if (selectedShade) {
      return selectedShade;
    }

    const fixedShade = this.color().shades.find((shade) => shade.fixed);
    if (fixedShade) {
      return fixedShade;
    }

    return this.color().shades[0];
  });

  protected readonly hasUnsavedChanges = computed<boolean>(
    () => this.#data.color.toString() !== this.color().toString()
  );

  public constructor() {
    effect(() => {
      this.#dialogRef.disableClose = this.hasUnsavedChanges();
    });
  }

  protected changeShade(index: number): void {
    this.shadeIndex.set(index);
  }

  public unfixShade(shade: Shade, $event?: MouseEvent): void {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    if (!shade.fixed) {
      return;
    }

    const atLeastOneFixedLeft = this.color().shades.some((s) => s.fixed && s !== shade);

    if (!atLeastOneFixedLeft) {
      return;
    }

    shade.fixed = false;
    this.updateColor();
  }

  public update(type: UpdateType, value: string | number): void {
    const shade = this.shade();
    shade.fixed = true;

    switch (type) {
      case UpdateType.HEX:
        shade.hex = value as string;
        break;
      case UpdateType.HUE:
        shade.hsl = { ...shade.hsl, H: value as number };
        break;
      case UpdateType.SATURATION:
        shade.hsl = { ...shade.hsl, S: value as number };
        break;
      case UpdateType.LIGHTNESS:
        shade.hsl = { ...shade.hsl, L: value as number };
        break;
    }

    this.updateColor();

    const editedShade = this.color().shades.find((s) => s.hex === shade.hex);
    this.shadeIndex.set(editedShade?.index ?? -1);
  }

  protected cancel(): void {
    this.#dialogRef.close(undefined);
    this.color.set(this.#data.color.copy());
  }

  protected save(): void {
    this.#dialogRef.close(this.color());
  }

  private updateColor(): void {
    const updatedColor = this.color().copy();
    this.#colorService.regenerateShades(updatedColor);
    this.color.set(updatedColor);
  }

  protected getTooltip(shade: Shade, selected: boolean): string {
    const tooltips: Array<string> = [];

    if (!selected) {
      tooltips.push(this.#translateService.instant('editor.shades'));
    }

    if (shade.fixed) {
      tooltips.push(this.#translateService.instant('editor.unfix'));
    }

    return tooltips.join('\n');
  }
}
