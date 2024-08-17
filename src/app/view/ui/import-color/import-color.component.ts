import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent } from '@ng-icons/core';
import { heroArrowLeftMini, heroXMarkMini } from '@ng-icons/heroicons/mini';
import { TranslateModule } from '@ngx-translate/core';
import { debounce, of, timer } from 'rxjs';
import { ListService } from '../../../shared/data-access/list.service';
import { PaletteService } from '../../../shared/data-access/palette.service';
import { Color } from '../../../shared/model';
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

@Component({
  selector: 'rp-import-color',
  standalone: true,
  imports: [TranslateModule, NgIconComponent, ReactiveFormsModule, ScrollingModule],
  templateUrl: './import-color.component.html'
})
export class ImportColorComponent implements OnInit {
  readonly #data = inject<ImportColorData>(DIALOG_DATA);
  readonly #dialogRef = inject(DialogRef<Color>);
  readonly #listService = inject(ListService);
  readonly #paletteService = inject(PaletteService);

  protected readonly ICONS = {
    back: heroArrowLeftMini,
    close: heroXMarkMini
  } as const;

  /**
   * Search term form control.
   */
  protected readonly searchControl = new FormControl('', { nonNullable: true });

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
    )
  );

  /**
   * Flag indicating if the component is initialized.
   */
  protected readonly initialized = signal(false);

  /**
   * Filtered palettes based on the current search term.
   */
  readonly #filteredPalettes = computed(() => {
    // Check if palettes are loaded
    const palettes = this.#palettes();
    if (!palettes) {
      return undefined;
    }

    // Check if the search term is empty and palettes are loaded
    const searchTerm = this.searchTerm();
    if (!searchTerm) {
      return palettes;
    }

    // Normalize the search term
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Filter the palettes
    return palettes
      .map((palette) => {
        // Check if the palette name matches the search term
        if (palette.name.toLowerCase().includes(lowerCaseSearchTerm)) {
          return {
            id: palette.id,
            name: palette.name,
            colors: palette.colors
          };
        }

        // Check if any color name matches the search term and return only the matching colors
        const colors = palette.colors.filter((color) => color.name.toLowerCase().includes(lowerCaseSearchTerm));
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

  public ngOnInit(): void {
    // Set the initialized signal
    this.initialized.set(true);
  }

  /**
   * Emit the selected color.
   */
  protected colorClicked(paletteId: string, colorIndex: number): void {
    // Check if the palettes are loaded
    const palettes = this.#palettes();
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
}
