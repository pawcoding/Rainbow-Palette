import { CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, inject, model, output } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { heroAdjustmentsHorizontalMini, heroPencilSquareMini, heroTrashMini } from '@ng-icons/heroicons/mini';
import { TranslateModule } from '@ngx-translate/core';
import { Color, Palette, Shade } from '../../../shared/model';
import { textColor } from '../../../shared/utils/text-color';
import { MobileService } from '../../../shared/data-access/mobile.service';

@Component({
  selector: 'rp-view-palette',
  standalone: true,
  imports: [NgIconComponent, TranslateModule, CdkDropList, CdkDrag, CdkDragPlaceholder],
  templateUrl: './view-palette.component.html',
  styleUrl: './view-palette.component.css'
})
export class ViewPaletteComponent {
  readonly #mobileService = inject(MobileService);

  protected readonly isMobile = this.#mobileService.isMobile;

  protected readonly textColor = textColor;

  protected readonly heroPencilSquareMini = heroPencilSquareMini;
  protected readonly heroAdjustmentsHorizontalMin = heroAdjustmentsHorizontalMini;
  protected readonly heroTrashMini = heroTrashMini;

  public readonly palette = model.required<Palette>();

  public readonly renameColor = output<Color>();
  public readonly editColor = output<{
    color: Color;
    shadeIndex?: number;
  }>();
  public readonly removeColor = output<Color>();
  public readonly copyShade = output<Shade>();
  public readonly reorderColor = output<{ fromIndex: number; toIndex: number }>();

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

  protected colorDropped(event: CdkDragDrop<unknown>): void {
    if (event.previousIndex === event.currentIndex) {
      return;
    }

    this.reorderColor.emit({
      fromIndex: event.previousIndex,
      toIndex: event.currentIndex
    });
  }
}
