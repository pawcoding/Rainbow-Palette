import { Component, inject } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { LoadingComponent } from './loading/loading.component';
import { PaletteService } from './shared/data-access/palette.service';
import { PwaService } from './shared/data-access/pwa.service';

@Component({
  selector: 'rp-root',
  standalone: true,
  imports: [LayoutComponent, LoadingComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly _paletteService = inject(PaletteService);
  private readonly _pwaService = inject(PwaService);

  constructor() {
    this._paletteService.loadPaletteFromLocalStorage();
  }
}
