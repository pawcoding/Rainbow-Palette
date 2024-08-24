import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent } from '@ng-icons/core';
import {
  heroArrowLeftMini,
  heroEyeDropperMini,
  heroMagnifyingGlassMini,
  heroXMarkMini
} from '@ng-icons/heroicons/mini';
import { TranslateModule } from '@ngx-translate/core';
import { debounce, debounceTime, of, timer } from 'rxjs';
import { ListService } from '../../../shared/data-access/list.service';
import { PaletteService } from '../../../shared/data-access/palette.service';
import { Color, Palette } from '../../../shared/model';
import { ColorRangeSliderComponent } from '../../../shared/ui/color-range-slider/color-range-slider.component';
import { filterArray } from '../../../shared/utils/filter-array';
import { mapArray } from '../../../shared/utils/map-array';

/**
 * Data for the import color dialog.
 */
export type ImportColorData = {
  /**
   * The ID of the palette to import the color to.
   */
  paletteId: string;
};

/**
 * Palette with only the necessary properties for the import color dialog.
 */
type FilteredPalette = Pick<Palette, 'id' | 'name' | 'colors'>;

@Component({
  selector: 'rp-import-color',
  standalone: true,
  imports: [TranslateModule, NgIconComponent, ReactiveFormsModule, ScrollingModule, ColorRangeSliderComponent],
  templateUrl: './import-color.component.html',
  host: {
    '[style.--editor-saturation]': '"75%"',
    '[style.--editor-lightness]': '"50%"',
    '[style.--editor-hue]': 'hueControl.value'
  }
})
export class ImportColorComponent implements OnInit {
  readonly #data = inject<ImportColorData>(DIALOG_DATA);
  readonly #dialogRef = inject(DialogRef<Color>);
  readonly #listService = inject(ListService);
  readonly #paletteService = inject(PaletteService);

  protected readonly ICONS = {
    back: heroArrowLeftMini,
    close: heroXMarkMini,
    color: heroEyeDropperMini,
    search: heroMagnifyingGlassMini
  } as const;

  /**
   * Search term form control.
   */
  protected readonly searchControl = new FormControl('', { nonNullable: true });

  /**
   * Hue form control.
   */
  protected readonly hueControl = new FormControl(0, { nonNullable: true });

  /**
   * List of all palettes except the current palette.
   */
  readonly #palettes = toSignal(
    this.#listService.list$.pipe(
      filterArray((palette) => palette.id !== this.#data.paletteId),
      mapArray((palette) => this.#paletteService.loadPaletteFromLocalStorage(palette.id, true)),
      filterArray((palette) => palette !== undefined),
      mapArray((palette) => palette!),
      filterArray((palette) => palette.colors.length > 0)
    )
  );

  /**
   * Current search term.
   */
  protected readonly searchTerm = toSignal(
    this.searchControl.valueChanges.pipe(
      // Only debounce when a value is present, now when resetting to the empty search
      debounce((value) => (value ? timer(300) : of({})))
    ),
    {
      initialValue: this.searchControl.value
    }
  );

  /**
   * Current hue value.
   */
  protected readonly hue = toSignal(this.hueControl.valueChanges.pipe(debounceTime(300)), {
    initialValue: this.hueControl.value
  });

  /**
   * Flag indicating if the component is initialized.
   */
  protected readonly initialized = signal(false);

  /**
   * Mode determining the search algorithm.
   *
   * If 'text', the search term is matched against the palette and color names.
   * If 'hue', the search term is matched against the hue values of the colors.
   */
  protected readonly mode = signal<'text' | 'hue'>('text');

  /**
   * Filtered palettes based on the current search term.
   */
  readonly #filteredPalettes = computed(() => {
    // Check if palettes are loaded
    const palettes = this.#palettes();
    if (!palettes) {
      return undefined;
    }

    // Filter the palettes based on the mode
    if (this.mode() === 'text') {
      return this.filterByName(palettes);
    } else {
      return this.filterByHue(palettes);
    }
  });

  /**
   * List of palettes and colors to display.
   */
  protected readonly filteredPalettes = computed(() => {
    // Check if the palettes are loaded
    const filteredPalettes = this.#filteredPalettes();
    if (!filteredPalettes) {
      return [];
    }

    // Transform the palettes and colors
    return filteredPalettes
      .map((palette) => {
        return [
          // Palette
          {
            type: 'palette' as const,
            name: palette.name
          },
          // Colors
          ...palette.colors.map((color, index) => ({
            type: 'color' as const,
            paletteId: palette.id,
            colorIndex: index,
            name: color.name,
            // Pick the light, mid, and dark shades to display
            light: color.shades.find((shade) => shade.index === 200)?.hex,
            mid: color.shades.find((shade) => shade.index === 500)?.hex,
            dark: color.shades.find((shade) => shade.index === 800)?.hex
          }))
        ];
      })
      .flat();
  });

  /**
   * Text for the mode switch button.
   */
  protected readonly modeSwitchText = computed(() => {
    if (this.mode() === 'text') {
      return 'view.import.search.hue';
    } else {
      return 'view.import.search.name';
    }
  });

  public ngOnInit(): void {
    // Set the initialized signal
    this.initialized.set(true);
  }

  /**
   * Emit the selected color.
   */
  protected colorClicked(paletteId: string, colorIndex: number): void {
    // Check if the palettes are loaded
    const palettes = this.#filteredPalettes();
    if (!palettes) {
      return;
    }

    // Find the palette
    const palette = palettes.find((p) => p.id === paletteId);
    if (!palette) {
      return;
    }

    // Find the color
    const color = palette.colors[colorIndex];
    if (!color) {
      return;
    }

    // Emit a copy of the color
    this.#dialogRef.close(color.copy());
  }

  /**
   * Close the dialog without emitting a color.
   */
  protected close(): void {
    this.#dialogRef.close();
  }

  /**
   * Reset the search term.
   */
  protected resetSearch(): void {
    this.searchControl.setValue('');
  }

  /**
   * Toggle the search mode.
   */
  protected toggleMode(): void {
    this.mode.update((mode) => (mode === 'text' ? 'hue' : 'text'));
  }

  /**
   * Filter the palettes by their name / color names.
   */
  private filterByName(palettes: Array<Palette>): Array<FilteredPalette> {
    const searchTerm = this.searchTerm().toLowerCase();
    // Check if the search term is empty
    if (!searchTerm) {
      return palettes;
    }

    // Filter the palettes
    return (
      palettes
        .map((palette) => {
          // Check if the palette name matches the search term
          if (palette.name.toLowerCase().includes(searchTerm)) {
            return {
              id: palette.id,
              name: palette.name,
              colors: palette.colors
            };
          }

          // Check if any color name matches the search term and return only the matching colors
          const colors = palette.colors.filter((color) => color.name.toLowerCase().includes(searchTerm));
          if (colors.length > 0) {
            return {
              id: palette.id,
              name: palette.name,
              colors
            };
          }

          // No match
          return undefined;
        })
        // Remove empty palettes
        .filter((palette) => palette !== undefined)
    );
  }

  /**
   * Filter the palettes by their color hues.
   */
  private filterByHue(palettes: Array<Palette>): Array<FilteredPalette> {
    return palettes
      .map((palette) => {
        // Check if any color has a shade with a similar hue and return only the matching colors
        const colors = palette.colors.filter((color) =>
          // Check the shades of the color
          color.shades.some((shade) => {
            // Calculate the hue difference
            const hueDiff = Math.abs(shade.hsl.H - this.hue());
            const hueDiffWrapped = Math.min(hueDiff, 360 - hueDiff);
            // Check if the hue difference is below the threshold
            return Math.min(hueDiff, hueDiffWrapped) < 30;
          })
        );
        if (colors.length > 0) {
          return {
            id: palette.id,
            name: palette.name,
            colors
          };
        }

        // No match
        return undefined;
      })
      .filter((palette) => palette !== undefined);
  }
}
