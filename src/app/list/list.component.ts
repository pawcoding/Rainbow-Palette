import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { heroArrowRightMini, heroPlusMini } from '@ng-icons/heroicons/mini';
import { TranslateModule } from '@ngx-translate/core';
import { ListService } from '../shared/data-access/list.service';
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

  protected readonly list = toSignal(this._listService.list$, {
    initialValue: []
  });

  protected readonly heroArrowRightMini = heroArrowRightMini;
  protected readonly heroPlusMini = heroPlusMini;
}
