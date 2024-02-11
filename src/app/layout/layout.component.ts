import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  heroAdjustmentsHorizontalSolid,
  heroRectangleGroupSolid,
  heroSwatchSolid,
} from '@ng-icons/heroicons/solid';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../shared/data-access/language.service';
import { MobileService } from './data-access/mobile.service';
import { ThemeService } from './data-access/theme.service';
import { Language } from './types/language';
import { NavigationEntry } from './types/navigation-entry';
import { Theme } from './types/theme';
import { LayoutFooterComponent } from './ui/layout-footer/layout-footer.component';
import { LayoutNavigationComponent } from './ui/layout-navigation/layout-navigation.component';
import { LayoutOptionsComponent } from './ui/layout-options/layout-options.component';

@Component({
  selector: 'rp-layout',
  standalone: true,
  imports: [
    TranslateModule,
    LayoutNavigationComponent,
    CommonModule,
    LayoutOptionsComponent,
    LayoutFooterComponent,
    RouterOutlet,
  ],
  providers: [
    provideIcons({
      heroSwatchSolid,
      heroAdjustmentsHorizontalSolid,
      heroRectangleGroupSolid,
    }),
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  private readonly _mobileService = inject(MobileService);
  private readonly _languageService = inject(LanguageService);
  private readonly _themeService = inject(ThemeService);

  protected readonly navigationEntries: Array<NavigationEntry> = [
    {
      title: 'layout.navigation.generate.title',
      path: '/',
      icon: 'heroSwatchSolid',
      description: 'layout.navigation.generate.description',
    },
    {
      title: 'layout.navigation.edit.title',
      path: '/edit',
      icon: 'heroAdjustmentsHorizontalSolid',
      description: 'layout.navigation.edit.description',
    },
    {
      title: 'layout.navigation.preview.title',
      path: '/preview',
      icon: 'heroRectangleGroupSolid',
      description: 'layout.navigation.preview.description',
    },
  ];
  protected readonly isMobile = this._mobileService.isMobile;
  protected readonly language = this._languageService.language;
  protected readonly theme = this._themeService.theme;

  protected readonly logoAsset = computed(() => {
    return this.theme() === 'dark'
      ? '/assets/rainbow-palette-light.svg'
      : '/assets/rainbow-palette-dark.svg';
  });

  protected changeLanguage(language: Language): void {
    this._languageService.setLanguage(language);
  }

  protected changeTheme(theme: Theme): void {
    this._themeService.setTheme(theme);
  }
}
