import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { heroPlusMini } from '@ng-icons/heroicons/mini';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DialogService } from '../shared/data-access/dialog.service';
import { ListService, PaletteListItem } from '../shared/data-access/list.service';
import { PaletteService } from '../shared/data-access/palette.service';
import { NoPaletteComponent } from '../shared/ui/no-palette/no-palette.component';
import { PaletteListComponent } from './ui/palette-list/palette-list.component';

@Component({
  selector: 'rp-list',
  standalone: true,
  imports: [RouterLink, TranslateModule, NgIconComponent, NoPaletteComponent, PaletteListComponent],
  templateUrl: './list.component.html',
  styleUrl: `list.component.css`
})
export default class ListComponent {
  private readonly _listService = inject(ListService);
  private readonly _paletteService = inject(PaletteService);
  private readonly _dialogService = inject(DialogService);
  private readonly _translateService = inject(TranslateService);
  private readonly _router = inject(Router);

  protected readonly list = toSignal(this._listService.list$, {
    initialValue: []
  });

  protected readonly heroPlusMini = heroPlusMini;

  protected async deletePalette(palette: PaletteListItem): Promise<void> {
    const shouldDelete = await this._dialogService.confirm({
      title: 'list.delete.hover',
      message: this._translateService.instant('list.delete.dialog', {
        name: palette.name
      }),
      confirmLabel: 'common.delete'
    });
    if (shouldDelete) {
      this._listService.remove(palette.id);
    }
  }

  protected async duplicatePalette(palette: PaletteListItem): Promise<void> {
    // Load the palette to duplicate
    this._paletteService.loadPaletteFromLocalStorage(palette.id);

    try {
      // Create a copy of the palette and open it
      const copyId = this._paletteService.duplicatePalette();
      await this._router.navigate(['/view', copyId], {
        info: {
          palette: 'new'
        }
      });
    } catch (e) {
      console.error('Could not duplicate palette.', e);
    }
  }
}
