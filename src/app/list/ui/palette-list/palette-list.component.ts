import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { heroArrowRightMini, heroTrashMini } from '@ng-icons/heroicons/mini';
import { heroDocumentDuplicate } from '@ng-icons/heroicons/outline';
import { TranslateModule } from '@ngx-translate/core';
import { PaletteListItem } from '../../../shared/data-access/list.service';

@Component({
  selector: 'rp-palette-list',
  standalone: true,
  imports: [RouterLink, TranslateModule, NgIconComponent],
  templateUrl: './palette-list.component.html'
})
export class PaletteListComponent {
  /**
   * The list of palettes to display.
   */
  public readonly list = input.required<Array<PaletteListItem>>();

  /**
   * Emits when a palette is selected.
   */
  public readonly deletePalette = output<PaletteListItem>();
  /**
   * Emits when a palette should be duplicated.
   */
  public readonly duplicatePalette = output<PaletteListItem>();

  protected readonly heroArrowRightMini = heroArrowRightMini;
  protected readonly heroTrashMini = heroTrashMini;
  protected readonly heroDocumentDuplicate = heroDocumentDuplicate;
}
