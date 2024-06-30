import { Component, computed, inject } from '@angular/core';
import { MobileService } from '../shared/data-access/mobile.service';
import { ThemeService } from '../shared/data-access/theme.service';

@Component({
  selector: 'rp-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  private readonly _themeService = inject(ThemeService);
  private readonly _mobileService = inject(MobileService);

  protected readonly logoAsset = computed(() => {
    return this._themeService.isDark() ? '/assets/rainbow-palette-light.svg' : '/assets/rainbow-palette-dark.svg';
  });

  protected readonly isMobile = this._mobileService.isMobile;
}
