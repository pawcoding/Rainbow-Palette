import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PaletteService, VersionService } from './shared/data-access';

@Component({
  selector: 'rp-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly _versionService = inject(VersionService);
  private readonly _paletteService = inject(PaletteService);

  constructor() {
    this._paletteService.loadPaletteFromLocalStorage();
  }
}
