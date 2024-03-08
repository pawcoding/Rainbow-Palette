import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PaletteService } from './shared/data-access/palette.service';
import { PwaService } from './shared/data-access/pwa.service';
import { VersionService } from './shared/data-access/version.service';

@Component({
  selector: 'rp-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly _versionService = inject(VersionService);
  private readonly _paletteService = inject(PaletteService);
  private readonly _pwaService = inject(PwaService);

  constructor() {
    this._paletteService.loadPaletteFromLocalStorage();
  }
}
