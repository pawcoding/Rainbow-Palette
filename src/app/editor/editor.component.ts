import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { DecimalPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ColorService } from '../shared/data-access/color.service';
import { Color, Shade } from '../shared/model';
import { ColorInputComponent } from '../shared/ui/color-input/color-input.component';
import { EditorRangeComponent } from './ui/editor-range/editor-range.component';

export enum UpdateType {
  HEX = 'hex',
  HUE = 'hue',
  SATURATION = 'saturation',
  LIGHTNESS = 'lightness',
}

@Component({
  selector: 'rp-editor',
  standalone: true,
  imports: [
    ColorInputComponent,
    TranslateModule,
    DecimalPipe,
    EditorRangeComponent,
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
})
export class EditorComponent {
  protected readonly UpdateType = UpdateType;

  private readonly _data = inject<{ color: Color; shadeIndex?: number }>(
    DIALOG_DATA
  );
  private readonly _dialogRef = inject(DialogRef);
  private readonly _colorService = inject(ColorService);
  private readonly _translateService = inject(TranslateService);

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

  private readonly _editor =
    viewChild.required<ElementRef<HTMLElement>>('editor');

  constructor() {
    effect(() => {
      this._editor().nativeElement.style.setProperty(
        '--editor-hex',
        this.shade().hex
      );
      this._editor().nativeElement.style.setProperty(
        '--editor-hue',
        `${this.shade().hsl.H}`
      );
      this._editor().nativeElement.style.setProperty(
        '--editor-saturation',
        `${this.shade().hsl.S}%`
      );
      this._editor().nativeElement.style.setProperty(
        '--editor-lightness',
        `${this.shade().hsl.L}%`
      );
    });
  }

  protected changeShade(index: number) {
    this.shadeIndex.set(index);
  }

  public unfixShade(shade: Shade, $event?: MouseEvent) {
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

  public update(type: UpdateType, value: string | number) {
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

    this._updateColor();

    const editedShade = this.color().shades.find((s) => s.hex === shade.hex);
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

  protected getTooltip(shade: Shade, selected: boolean): string {
    const tooltips: Array<string> = [];

    if (!selected) {
      tooltips.push(this._translateService.instant('editor.shades'));
    }

    if (shade.fixed) {
      tooltips.push(this._translateService.instant('editor.unfix'));
    }

    return tooltips.join('\n');
  }
}
