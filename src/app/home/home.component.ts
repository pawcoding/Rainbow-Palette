import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService } from '../shared/data-access/analytics.service';
import { PaletteService } from '../shared/data-access/palette.service';
import { HomeService } from './data-access/home.service';
import { HomeGeneratorComponent } from './ui/home-generator/home-generator.component';
import { HomeManualComponent } from './ui/home-manual/home-manual.component';
import { HomeSupportComponent } from './ui/home-support/home-support.component';

@Component({
  selector: 'rp-home',
  standalone: true,
  imports: [HomeGeneratorComponent, HomeManualComponent, HomeSupportComponent],
  templateUrl: './home.component.html',
})
export default class HomeComponent {
  private readonly _homeService = inject(HomeService);
  private readonly _paletteService = inject(PaletteService);
  private readonly _analyticsService = inject(AnalyticsService);
  private readonly _router = inject(Router);

  protected readonly hex = this._homeService.hex;
  protected readonly scheme = this._homeService.scheme;

  public async generatePalette(): Promise<void> {
    this._homeService.saveGenerationSettings();

    this._paletteService.generatePalette(this.hex(), this.scheme());
    this._analyticsService.trackPaletteGeneration(this.scheme());

    await this._router.navigate(['/view']);
  }
}
