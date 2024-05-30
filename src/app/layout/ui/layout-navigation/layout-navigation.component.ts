import { Component, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { TranslateModule } from '@ngx-translate/core';
import { filter, map } from 'rxjs';
import { NavigationEntry } from '../../types/navigation-entry';

@Component({
  selector: 'rp-layout-navigation',
  standalone: true,
  imports: [TranslateModule, NgIconComponent, RouterLink],
  templateUrl: './layout-navigation.component.html',
  styles: ':host { display: inline-block; width: 100%; }'
})
export class LayoutNavigationComponent {
  private readonly _router = inject(Router);

  public readonly navigationEntries = input.required<Array<NavigationEntry>>();

  protected readonly currentPath = toSignal(
    this._router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects)
    ),
    {
      initialValue: this._router.url
    }
  );

  protected isActive(path: string, url: string): boolean {
    if (path === '/') {
      return url === path;
    } else {
      return url.startsWith(path);
    }
  }
}
