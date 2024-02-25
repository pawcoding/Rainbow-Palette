import { Component, EventEmitter, Output, model } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import {
  heroAdjustmentsHorizontalMini,
  heroPencilSquareMini,
  heroTrashMini,
} from '@ng-icons/heroicons/mini';
import { TranslateModule } from '@ngx-translate/core';
import { Color } from '../../../shared/model/color.model';
import { Palette } from '../../../shared/model/palette.model';
import { Shade } from '../../../shared/model/shade.model';

@Component({
  selector: 'rp-editor-palette',
  standalone: true,
  imports: [NgIconComponent, TranslateModule],
  templateUrl: './editor-palette.component.html',
})
export class EditorPaletteComponent {
  protected readonly heroPencilSquareMini = heroPencilSquareMini;
  protected readonly heroAdjustmentsHorizontalMin =
    heroAdjustmentsHorizontalMini;
  protected readonly heroTrashMini = heroTrashMini;

  public readonly palette = model.required<Palette>();

  @Output()
  public readonly renameColor = new EventEmitter<Color>();
  @Output()
  public readonly editColor = new EventEmitter<{
    color: Color;
    shadeIndex?: number;
  }>();
  @Output()
  public readonly removeColor = new EventEmitter<Color>();
  @Output()
  public readonly copyShade = new EventEmitter<Shade>();

  protected rename(color: Color): void {
    this.renameColor.emit(color);
  }

  protected edit(color: Color, shadeIndex?: number): void {
    this.editColor.emit({ color, shadeIndex });
  }

  protected remove(color: Color): void {
    this.removeColor.emit(color);
  }

  protected copyToClipboard(shade: Shade, $event?: MouseEvent): void {
    if ($event) {
      $event.stopPropagation();
    }

    this.copyShade.emit(shade);
  }
}
