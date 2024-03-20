import { Component, inject } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { LoadingComponent } from './loading/loading.component';
import { VersionService } from './shared/data-access/version.service';

@Component({
  selector: 'rp-root',
  standalone: true,
  imports: [LayoutComponent, LoadingComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  // This service gets injected here to print the version number in the console on startup.
  private readonly _versionService = inject(VersionService);
}
