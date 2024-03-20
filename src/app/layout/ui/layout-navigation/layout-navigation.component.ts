import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { TranslateModule } from '@ngx-translate/core';
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

  protected get currentPath(): string {
    return this._router.url;
  }
}
