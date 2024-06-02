import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { heroArrowRightMini, heroPlusMini, heroTrashMini } from '@ng-icons/heroicons/mini';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DialogService } from '../shared/data-access/dialog.service';
import { ListService, PaletteListItem } from '../shared/data-access/list.service';
import { NoPaletteComponent } from '../shared/ui/no-palette/no-palette.component';

@Component({
  selector: 'rp-list',
  standalone: true,
  imports: [RouterLink, TranslateModule, NgIconComponent, NoPaletteComponent],
  templateUrl: './list.component.html',
  styleUrl: `list.component.css`
})
export default class ListComponent {
  private readonly _listService = inject(ListService);
  private readonly _dialogService = inject(DialogService);
  private readonly _translateService = inject(TranslateService);

  protected readonly list = toSignal(this._listService.list$, {
    initialValue: []
  });

  protected readonly heroArrowRightMini = heroArrowRightMini;
  protected readonly heroPlusMini = heroPlusMini;
  protected readonly heroTrashMini = heroTrashMini;

  protected async deletePalette(palette: PaletteListItem): Promise<void> {
    const shouldDelete = await this._dialogService.confirm(
      this._translateService.instant('list.delete.dialog', {
        name: palette.name
      })
    );
    if (shouldDelete) {
      this._listService.remove(palette.id);
    }
  }
}
