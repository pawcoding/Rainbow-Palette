import { Injectable, inject } from '@angular/core';
import { ExportFormat } from '../constants/export-format';
import { CssFormatter } from '../formatter/css.formatter';
import { LessFormatter } from '../formatter/less.formatter';
import { ScssFormatter } from '../formatter/scss.formatter';
import { TailwindFormatter } from '../formatter/tailwind.formatter';
import { Formatter } from '../interfaces/formatter.interface';
import { Palette } from '../model/palette.model';
import { ExportOption } from '../types/export-option';
import { AnalyticsService } from './analytics.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private readonly _toastService = inject(ToastService);
  private readonly _analyticsService = inject(AnalyticsService);

  public async exportPalette(
    palette: Palette,
    format: ExportFormat,
    option: ExportOption
  ): Promise<boolean> {
    const formatter = this.getFormatterForFormat(format);
    if (!formatter) {
      this._toastService.showToast({
        type: 'error',
        message: 'export.error.format-not-found',
      });
      return false;
    }

    const success = await this._exportPalette(palette, formatter, option);

    // Track the export event if successful
    if (success) {
      this._analyticsService.trackPaletteExport(format, option);
    }

    return success;
  }

  private async _exportPalette(
    palette: Palette,
    formatter: Formatter,
    option: ExportOption
  ): Promise<boolean> {
    if (option === 'copy') {
      return await this.copy(palette, formatter);
    } else if (option === 'file') {
      return await this.download(palette, formatter);
    }

    return false;
  }

  public async copy(palette: Palette, formatter: Formatter): Promise<boolean> {
    const content = formatter.formatPalette(palette);

    try {
      await navigator.clipboard.writeText(content);
      return true;
    } catch (error) {
      console.error(error);
      this._toastService.showToast({
        type: 'error',
        message: 'export.error.copy-failed',
      });
      return false;
    }
  }

  public async download(
    palette: Palette,
    formatter: Formatter
  ): Promise<boolean> {
    const content = formatter.formatFile(palette);
    const blob = new Blob([content], { type: formatter.mimeType });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = formatter.filename;
    a.click();

    return true;
  }

  private getFormatterForFormat(format: ExportFormat): Formatter | undefined {
    switch (format) {
      case ExportFormat.TAILWIND:
        return new TailwindFormatter();
      case ExportFormat.SCSS:
        return new ScssFormatter();
      case ExportFormat.CSS:
        return new CssFormatter();
      case ExportFormat.LESS:
        return new LessFormatter();
      default:
        return undefined;
    }
  }
}

export class ExportServiceMock {
  public async exportPalette(
    _palette: Palette,
    _format: ExportFormat,
    _option: ExportOption
  ): Promise<boolean> {
    return true;
  }

  public async copy(
    _palette: Palette,
    _formatter: Formatter
  ): Promise<boolean> {
    return true;
  }

  public async download(
    _palette: Palette,
    _formatter: Formatter
  ): Promise<boolean> {
    return true;
  }
}
