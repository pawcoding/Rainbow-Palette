import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  heroAdjustmentsHorizontalSolid,
  heroRectangleGroupSolid,
  heroSwatchSolid,
} from '@ng-icons/heroicons/solid';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../shared/data-access/language.service';
import { MobileService } from '../shared/data-access/mobile.service';
import { sleep } from '../shared/utils/sleep';
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
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements AfterViewInit {
  private readonly _mobileService = inject(MobileService);
  private readonly _languageService = inject(LanguageService);
  private readonly _themeService = inject(ThemeService);

  private readonly _header = viewChild.required<{ nativeElement: HTMLElement }>(
    'header'
  );
  private readonly _footer = viewChild<{ nativeElement: HTMLElement }>(
    'footer'
  );

  protected readonly navigationEntries: Array<NavigationEntry> = [
    {
      title: 'layout.navigation.generate.title',
      path: '/',
      icon: heroSwatchSolid,
      description: 'layout.navigation.generate.description',
    },
    {
      title: 'layout.navigation.edit.title',
      path: '/edit',
      icon: heroAdjustmentsHorizontalSolid,
      description: 'layout.navigation.edit.description',
    },
    {
      title: 'layout.navigation.preview.title',
      path: '/preview',
      icon: heroRectangleGroupSolid,
      description: 'layout.navigation.preview.description',
    },
  ];
  protected readonly isMobile = this._mobileService.isMobile;
  protected readonly language = this._languageService.language;
  protected readonly theme = this._themeService.theme;
  protected readonly initialized = signal(false);

  private readonly _resize = this._mobileService.resize;

  protected readonly logoAsset = computed(() => {
    return this.theme() === 'dark'
      ? '/assets/rainbow-palette-light.svg'
      : '/assets/rainbow-palette-dark.svg';
  });

  protected readonly headerHeight = computed(() => {
    // Reference resize signal to trigger computation on window resize
    this._resize();

    return `${this._header().nativeElement.offsetHeight}px`;
  });
  protected readonly footerHeight = computed(() => {
    // Reference resize signal to trigger computation on window resize
    this._resize();

    const footerHeight = this._footer()?.nativeElement.offsetHeight;
    return footerHeight ? `${footerHeight}px` : '0';
  });

  public async ngAfterViewInit(): Promise<void> {
    /*
     * Wait for header and footer heights to be resolved
     * before rendering the main content with the correct
     * padding.
     */
    await sleep(100);
    this.initialized.set(true);
  }

  protected changeLanguage(language: Language): void {
    this._languageService.setLanguage(language);
  }

  protected changeTheme(theme: Theme): void {
    this._themeService.setTheme(theme);
  }
}
