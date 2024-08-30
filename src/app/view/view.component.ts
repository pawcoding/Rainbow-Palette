import { Dialog } from '@angular/cdk/dialog';
import { Component, HostListener, OnInit, computed, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import {
  heroArrowDownTrayMini,
  heroArrowLeftMini,
  heroArrowPathMini,
  heroBookmarkMini,
  heroPencilSquareMini,
  heroPlusMini
} from '@ng-icons/heroicons/mini';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { combineLatestWith, firstValueFrom, map } from 'rxjs';
import { string_to_unicode_variant as toUnicodeVariant } from 'string-to-unicode-variant';
import { ColorEditorService } from '../editor/data-access/color-editor.service';
import { ExportModalService } from '../export/data-access/export-modal.service';
import { AnalyticsService } from '../shared/data-access/analytics.service';
import { ColorService } from '../shared/data-access/color.service';
import { DialogService } from '../shared/data-access/dialog.service';
import { ListService } from '../shared/data-access/list.service';
import { PaletteService } from '../shared/data-access/palette.service';
import { PwaService } from '../shared/data-access/pwa.service';
import { ToastService } from '../shared/data-access/toast.service';
import { TrackingEventAction, TrackingEventCategory } from '../shared/enums/tracking-event';
import { Color, Shade } from '../shared/model';
import { NoPaletteComponent } from '../shared/ui/no-palette/no-palette.component';
import { deduplicateName } from '../shared/utils/deduplicate-name';
import { IS_RUNNING_TEST } from '../shared/utils/is-running-test';
import { sleep } from '../shared/utils/sleep';
import { ImportColorData } from './ui/import-color/import-color.component';
import { ViewPaletteComponent } from './ui/view-palette/view-palette.component';
import { duplicateValidator } from './utils/duplicate.validator';
import { UnsavedChangesComponent } from './utils/unsaved-changes.guard';

@Component({
  selector: 'rp-view',
  standalone: true,
  imports: [ViewPaletteComponent, NoPaletteComponent, NgIconComponent, TranslateModule, RouterLink],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export default class ViewComponent implements OnInit, UnsavedChangesComponent {
  private readonly _isRunningTest = inject(IS_RUNNING_TEST);
  private readonly _colorEditorService = inject(ColorEditorService);
  private readonly _toastService = inject(ToastService);
  private readonly _paletteService = inject(PaletteService);
  private readonly _colorService = inject(ColorService);
  private readonly _translateService = inject(TranslateService);
  private readonly _dialogService = inject(DialogService);
  private readonly _exportService = inject(ExportModalService);
  private readonly _analyticsService = inject(AnalyticsService);
  private readonly _router = inject(Router);
  private readonly _pwaService = inject(PwaService);
  private readonly _dialog = inject(Dialog);
  private readonly _listService = inject(ListService);

  protected readonly heroPencilSquareMini = heroPencilSquareMini;
  protected readonly heroPlusMini = heroPlusMini;
  protected readonly heroArrowDownTrayMini = heroArrowDownTrayMini;
  protected readonly heroArrowLeftMini = heroArrowLeftMini;

  public readonly id = input.required<string>();

  protected readonly palette = this._paletteService.palette;
  protected readonly saving = signal(false);

  /**
   * Flag indicating if there are other palettes to import colors from
   */
  protected readonly hasOtherPalettes = toSignal(
    toObservable(this.palette).pipe(
      combineLatestWith(this._listService.list$),
      map(([palette, list]) => {
        // Check if palette and list is loaded
        if (!palette || list.length === 0) {
          return false;
        }

        // Filter out current palette
        return list.some((p) => p.id !== palette.id);
      })
    ),
    { initialValue: false }
  );

  private readonly _hasUnsavedChanges = signal(false);

  public ngOnInit(): void {
    // Load the palette from local storage
    this._paletteService.loadPaletteFromLocalStorage(this.id());

    // Check is the palette is new
    const navigation = this._router.lastSuccessfulNavigation;
    const info = navigation?.extras.info as { palette: 'new' } | undefined;
    if (info?.palette === 'new') {
      this._hasUnsavedChanges.set(true);
    }
  }

  protected readonly saveIcon = computed(() => {
    if (this.saving()) {
      return heroArrowPathMini;
    } else {
      return heroBookmarkMini;
    }
  });

  public readonly hasUnsavedChanges = computed(() => this._hasUnsavedChanges());

  public readonly saveTooltip = computed(() => {
    if (this.saving()) {
      return 'view.palette.saving';
    } else if (this.hasUnsavedChanges()) {
      return 'view.palette.save';
    } else {
      return 'view.palette.no-changes';
    }
  });

  public async renamePalette(): Promise<void> {
    const palette = this.palette();
    if (!palette) {
      return;
    }

    const newName = await this._dialogService.prompt({
      title: 'common.rename',
      message: 'view.palette.rename',
      confirmLabel: 'common.rename',
      initialValue: palette.name,
      label: 'common.name',
      placeholder: 'common.name'
    });

    if (!newName || newName === palette.name) {
      return;
    }

    if (newName) {
      palette.name = newName;
    }

    this._toastService.showToast({
      type: 'success',
      message: 'view.palette.renamed',
      parameters: { name: newName }
    });
    this._hasUnsavedChanges.set(true);
  }

  public async savePalette(): Promise<void> {
    if (this.saving()) {
      return;
    }

    this.saving.set(true);

    this._paletteService.savePaletteToLocalStorage();
    this._analyticsService.trackEvent(
      TrackingEventCategory.SAVE_PALETTE,
      TrackingEventAction.SAVE_PALETTE_LOCAL_STORAGE
    );

    if (!this._isRunningTest) {
      // Simulate a delay to show the saving icon for a few seconds in production
      await sleep(3000);
    }

    this.saving.set(false);
    this._toastService.showToast({
      type: 'success',
      message: 'view.palette.saved'
    });
    this._hasUnsavedChanges.set(false);
  }

  public async exportPalette(): Promise<void> {
    const palette = this.palette();
    if (!palette) {
      return;
    }

    await this._exportService.openExportModal(palette);
  }

  public async renameColor(color: Color): Promise<void> {
    // Get all color names except the current one
    const colorNames =
      this.palette()
        ?.colors.filter((c) => c !== color)
        .map((c) => c.name) ?? [];

    const newName = await this._dialogService.prompt({
      title: 'common.rename',
      message: 'view.color.rename',
      confirmLabel: 'common.rename',
      initialValue: color.name,
      label: 'common.name',
      placeholder: 'common.name',
      validation: {
        validators: [Validators.required, duplicateValidator(colorNames)],
        errorMessageKeys: {
          required: 'common.required',
          duplicate: 'view.color.duplicate-name'
        }
      }
    });

    if (!newName || newName === color.name) {
      return;
    }

    if (newName) {
      color.name = newName;
    }

    this._toastService.showToast({
      type: 'success',
      message: 'view.color.renamed',
      parameters: { name: newName }
    });
    this._hasUnsavedChanges.set(true);
  }

  public async editColor(color: Color, shadeIndex?: number): Promise<void> {
    const updatedColor = await this._colorEditorService.openColorEditor(color, shadeIndex);

    if (!updatedColor) {
      return;
    }

    color.shades = updatedColor.shades;
    this._hasUnsavedChanges.set(true);
  }

  public async removeColor(color: Color): Promise<void> {
    const name = color.name;
    const shouldRemove = await this._dialogService.confirm({
      title: 'view.color.remove-tooltip',
      message: this._translateService.instant('view.color.remove', {
        color: name
      }),
      confirmLabel: 'common.remove'
    });

    if (shouldRemove) {
      this.palette()?.removeColor(color);

      this._toastService.showToast({
        type: 'info',
        message: 'view.color.removed',
        parameters: { color: name }
      });
      this._hasUnsavedChanges.set(true);
    }
  }

  public async addColor(): Promise<void> {
    // Check if a palette exists
    const palette = this.palette();
    if (!palette) {
      return;
    }

    // Create a new random color
    const color = await this._colorService.randomColor();

    // Check if color name already exists
    const colorNames = palette.colors.map((c) => c.name);
    color.name = deduplicateName(color.name, colorNames);

    // Add the color to the palette
    palette.addColor(color);

    // Set unsaved changes
    this._hasUnsavedChanges.set(true);
  }

  /**
   * Import a color from another palette
   */
  public async importColor(): Promise<void> {
    // Check if palette is loaded
    const palette = this.palette();
    if (!palette) {
      return;
    }

    // Open the import selector
    const importer = await import('./ui/import-color/import-color.component').then((c) => c.ImportColorComponent);
    const dialogRef = this._dialog.open<Color | undefined, ImportColorData>(importer, {
      backdropClass: 'rp-modal-backdrop',
      data: {
        paletteId: palette.id
      },
      panelClass: 'rp-modal-panel',
      width: 'inherit'
    });

    // Check if color was selected
    const color = await firstValueFrom(dialogRef.closed);
    if (!color) {
      return;
    }

    // Track import event
    this._analyticsService.trackEvent(TrackingEventCategory.IMPORT_COLOR, TrackingEventAction.IMPORT_COLOR);

    // Check if color name already exists
    const colorNames = palette.colors.map((c) => c.name);
    color.name = deduplicateName(color.name, colorNames);

    // Import color to current palette
    palette.addColor(color);

    // Set unsaved changes
    this._hasUnsavedChanges.set(true);
  }

  public async copyToClipboard(shade: Shade): Promise<void> {
    try {
      await navigator.clipboard.writeText(shade.hex);

      this._toastService.showToast({
        type: 'success',
        message: 'view.color.copy',
        parameters: { color: toUnicodeVariant(shade.hex, 'm') }
      });
    } catch (error) {
      this._toastService.showToast({
        type: 'error',
        message: 'toast.error.copy-clipboard'
      });
    }
  }

  public reorderColor(fromIndex: number, toIndex: number): void {
    const palette = this.palette();
    if (!palette || fromIndex === toIndex) {
      return;
    }

    palette.reorderColor(fromIndex, toIndex);
    this._hasUnsavedChanges.set(true);
  }

  /**
   * Check if there are unsaved changes before leaving the page.
   * This method exists in addition to the normal `canDeactivate` guard
   * and is used to prevent the user from accidentally leaving the page.
   * The route guard is not enough because it only prevents navigation
   * inside the app, but not when the user closes the browser tab.
   */
  @HostListener('window:beforeunload', ['$event'])
  public checkUnsavedChanges(_: Event): boolean {
    // Don't worry about unsaved changes during an update
    if (this._pwaService.doingUpdate()) {
      return true;
    }

    // If there are unsaved changes, show a confirmation dialog by returning false
    if (this.hasUnsavedChanges()) {
      return false;
    }

    // There are no unsaved changes, so the user can leave the page
    return true;
  }
}
