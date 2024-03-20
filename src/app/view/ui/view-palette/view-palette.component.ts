import { Component, model, output } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import {
  heroAdjustmentsHorizontalMini,
  heroPencilSquareMini,
  heroTrashMini
} from '@ng-icons/heroicons/mini';
import { TranslateModule } from '@ngx-translate/core';
import { Color, Palette, Shade } from '../../../shared/model';
import { textColor } from '../../../shared/utils/text-color';

@Component({
  selector: 'rp-view-palette',
  standalone: true,
  imports: [NgIconComponent, TranslateModule],
  templateUrl: './view-palette.component.html'
})
export class ViewPaletteComponent {
  protected readonly textColor = textColor;

  protected readonly heroPencilSquareMini = heroPencilSquareMini;
  protected readonly heroAdjustmentsHorizontalMin =
    heroAdjustmentsHorizontalMini;
  protected readonly heroTrashMini = heroTrashMini;

  public readonly palette = model.required<Palette>();

  public readonly renameColor = output<Color>();
  public readonly editColor = output<{
    color: Color;
    shadeIndex?: number;
  }>();
  public readonly removeColor = output<Color>();
  public readonly copyShade = output<Shade>();

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
      $event.preventDefault();
    }

    this.copyShade.emit(shade);
  }
}
