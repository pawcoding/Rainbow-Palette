import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, take } from 'rxjs';
import { LayoutComponent } from './layout/layout.component';
import { LoadingComponent } from './loading/loading.component';
import { VersionService } from './shared/data-access/version.service';
import { LocalStorageKey } from './shared/enums/local-storage-keys';

@Component({
  selector: 'rp-root',
  standalone: true,
  imports: [LayoutComponent, LoadingComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  // This service gets injected here to print the version number in the console on startup.
  private readonly _versionService = inject(VersionService);
  private readonly _router = inject(Router);

  public constructor() {
    // Check if user has palette
    const hasPalette = localStorage.getItem(LocalStorageKey.PALETTE);
    if (hasPalette) {
      return;
    }

    // Redirect to home if user has no palette when app starts
    this._router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        take(1),
        map((event) => event.urlAfterRedirects)
      )
      .subscribe((url) => {
        if (url === '/view' || url === '/preview') {
          this._router.navigate(['/']);
        }
      });
  }
}
