import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  heroAdjustmentsHorizontalSolid,
  heroRectangleGroupSolid,
  heroSwatchSolid
} from '@ng-icons/heroicons/solid';
import { TranslateModule } from '@ngx-translate/core';
import {
  AnalyticsService,
  AnalyticsStatus
} from '../shared/data-access/analytics.service';
import { LanguageService } from '../shared/data-access/language.service';
import { MobileService } from '../shared/data-access/mobile.service';
import { PwaService } from '../shared/data-access/pwa.service';
import { ThemeService } from '../shared/data-access/theme.service';
import { Theme } from '../shared/types/theme';
import { sleep } from '../shared/utils/sleep';
import { Language } from './types/language';
import { NavigationEntry } from './types/navigation-entry';
import { LayoutAnalyticsConsentComponent } from './ui/layout-analytics-consent/layout-analytics-consent.component';
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
    LayoutAnalyticsConsentComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements AfterViewInit {
  private readonly _mobileService = inject(MobileService);
  private readonly _languageService = inject(LanguageService);
  private readonly _themeService = inject(ThemeService);
  private readonly _analyticsService = inject(AnalyticsService);
  // This service gets injected into the layout to initialize the PWA service after the layout has been initialized.
  private readonly _pwaService = inject(PwaService);

  private readonly _header =
    viewChild.required<ElementRef<HTMLElement>>('header');
  private readonly _footer = viewChild<ElementRef<HTMLElement>>('footer');
  private readonly _bottomNavigation =
    viewChild<ElementRef<HTMLElement>>('bottomNavigation');
  private readonly _analytics = viewChild(LayoutAnalyticsConsentComponent);

  protected readonly navigationEntries: Array<NavigationEntry> = [
    {
      title: 'layout.navigation.generate.title',
      path: '/',
      icon: heroSwatchSolid,
      description: 'layout.navigation.generate.description'
    },
    {
      title: 'layout.navigation.view.title',
      path: '/view',
      icon: heroAdjustmentsHorizontalSolid,
      description: 'layout.navigation.view.description'
    },
    {
      title: 'layout.navigation.preview.title',
      path: '/preview',
      icon: heroRectangleGroupSolid,
      description: 'layout.navigation.preview.description'
    }
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

  protected readonly showAnalyticsConsent = computed(() => {
    return this._analyticsService.status() === AnalyticsStatus.UNSET;
  });

  public constructor() {
    effect(() => {
      if (!this.initialized()) {
        return;
      }

      // Reference resize signal to trigger computation on window resize
      this._resize();

      document.documentElement.style.setProperty(
        '--header-height',
        `${this._header().nativeElement.offsetHeight}px`
      );

      const footerHeight = this._footer()?.nativeElement.offsetHeight ?? 0;
      document.documentElement.style.setProperty(
        '--footer-height',
        `${footerHeight}px`
      );

      const bottomNavigationHeight =
        this._bottomNavigation()?.nativeElement.offsetHeight ?? 0;
      document.documentElement.style.setProperty(
        '--bottom-navigation-height',
        `${bottomNavigationHeight}px`
      );

      const analyticsHeight = this._analytics()?.height() ?? 0;
      document.documentElement.style.setProperty(
        '--analytics-consent-height',
        `${analyticsHeight}px`
      );
    });
  }

  public async ngAfterViewInit(): Promise<void> {
    /*
     * Wait for header and footer heights to be resolved
     * before rendering the main content with the correct
     * padding.
     */
    await sleep(100);
    this.initialized.set(true);
  }

  public changeLanguage(language: Language): void {
    this._languageService.setLanguage(language);
  }

  public changeTheme(theme: Theme): void {
    this._themeService.setTheme(theme);
  }

  public analyticsConsent(consent: boolean): void {
    if (consent) {
      this._analyticsService.acceptAnalytics();
    } else {
      this._analyticsService.declineAnalytics();
    }
  }
}
