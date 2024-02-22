import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PaletteScheme } from '../shared/constants/palette-scheme';
import { PaletteService } from '../shared/data-access/palette.service';
import { HomeGeneratorComponent } from './ui/home-generator/home-generator.component';
import { HomeManualComponent } from './ui/home-manual/home-manual.component';
import { HomeSupportComponent } from './ui/home-support/home-support.component';

@Component({
  selector: 'rp-home',
  standalone: true,
  imports: [HomeGeneratorComponent, HomeManualComponent, HomeSupportComponent],
  templateUrl: './home.component.html',
})
export default class HomeComponent implements OnInit {
  private readonly _paletteService = inject(PaletteService);
  private readonly _router = inject(Router);

  public readonly hex = signal('#3B82F6');
  public readonly scheme = signal(PaletteScheme.RAINBOW);

  public ngOnInit(): void {
    const { hex, schema } = this._loadGenerationSettings();

    this.hex.set(hex);
    this.scheme.set(schema);
  }

  protected async generatePalette(): Promise<void> {
    this._saveGenerationSettings();

    this._paletteService.generatePalette(this.hex(), this.scheme());

    await this._router.navigate(['/edit']);
  }

  private _saveGenerationSettings(): void {
    localStorage.setItem(
      'lastGeneration',
      JSON.stringify({ hex: this.hex(), scheme: this.scheme() })
    );
  }

  private _loadGenerationSettings(): { hex: string; schema: PaletteScheme } {
    const lastGeneration = localStorage.getItem('lastGeneration');

    if (lastGeneration) {
      try {
        return JSON.parse(lastGeneration);
      } catch {
        localStorage.removeItem('lastGeneration');
      }
    }

    return { hex: this.hex(), schema: this.scheme() };
  }
}
