import { Component, HostListener, OnInit, computed, inject, input, signal } from '@angular/core';
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
import { string_to_unicode_variant as toUnicodeVariant } from 'string-to-unicode-variant';
import { ColorEditorService } from '../editor/data-access/color-editor.service';
import { ExportModalService } from '../export/data-access/export-modal.service';
import { AnalyticsService } from '../shared/data-access/analytics.service';
import { ColorService } from '../shared/data-access/color.service';
import { DialogService } from '../shared/data-access/dialog.service';
import { PaletteService } from '../shared/data-access/palette.service';
import { ToastService } from '../shared/data-access/toast.service';
import { TrackingEventAction, TrackingEventCategory } from '../shared/enums/tracking-event';
import { Color, Shade } from '../shared/model';
import { NoPaletteComponent } from '../shared/ui/no-palette/no-palette.component';
import { IS_RUNNING_TEST } from '../shared/utils/is-running-test';
import { sleep } from '../shared/utils/sleep';
import { ViewPaletteComponent } from './ui/view-palette/view-palette.component';
import { UnsavedChangesComponent } from './utils/unsaved-changes.guard';

@Component({
  selector: 'rp-view',
  standalone: true,
  imports: [ViewPaletteComponent, NoPaletteComponent, NgIconComponent, TranslateModule, RouterLink],
  templateUrl: './view.component.html'
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

  protected readonly heroPencilSquareMini = heroPencilSquareMini;
  protected readonly heroPlusMini = heroPlusMini;
  protected readonly heroArrowDownTrayMini = heroArrowDownTrayMini;
  protected readonly heroArrowLeftMini = heroArrowLeftMini;

  public readonly id = input.required<string>();

  protected readonly palette = this._paletteService.palette;
  protected readonly saving = signal(false);

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

    const newName = await this._dialogService.prompt(
      this._translateService.instant('view.palette.rename'),
      palette.name
    );

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
    const newName = await this._dialogService.prompt(this._translateService.instant('view.color.rename'), color.name);

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
    const shouldRemove = await this._dialogService.confirm(
      this._translateService.instant('view.color.remove', {
        color: name
      })
    );

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
    const palette = this.palette();
    if (!palette) {
      return;
    }

    const color = await this._colorService.randomColor();
    palette.addColor(color);
    this._hasUnsavedChanges.set(true);
  }

  public async copyToClipboard(shade: Shade): Promise<void> {
    try {
      await navigator.clipboard.writeText(shade.hex);

      this._toastService.showToast({
        type: 'success',
        message: 'view.color.copy.success',
        parameters: { color: toUnicodeVariant(shade.hex, 'm') }
      });
    } catch (error) {
      this._toastService.showToast({
        type: 'error',
        message: 'view.color.copy.error'
      });
    }
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
    // If there are unsaved changes, show a confirmation dialog by returning false
    if (this.hasUnsavedChanges()) {
      return false;
    }

    // There are no unsaved changes, so the user can leave the page
    return true;
  }
}
