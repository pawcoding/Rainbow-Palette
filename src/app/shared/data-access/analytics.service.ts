import { Injectable, effect, inject } from '@angular/core';
import { MatomoTracker } from 'ngx-matomo-client';
import { ExportFormat } from '../constants/export-format';
import { PaletteScheme } from '../constants/palette-scheme';
import {
  TrackingEventAction,
  TrackingEventCategory,
  TrackingEventName,
} from '../enums/tracking-event';
import { ExportOption } from '../types/export-option';
import { LanguageService } from './language.service';
import { ThemeService } from './theme.service';
import { VersionService } from './version.service';

export enum CustomDimension {
  LANGUAGE = 1,
  THEME = 2,
  PWA = 3,
  VERSION = 4,
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly _tracker = inject(MatomoTracker);
  private readonly _themeService = inject(ThemeService);
  private readonly _languageService = inject(LanguageService);
  private readonly _versionService = inject(VersionService);

  constructor() {
    // Send a heartbeat every 30 seconds
    this._tracker.enableHeartBeatTimer(30);

    // Track current theme
    effect(() => {
      this._tracker.setCustomDimension(
        CustomDimension.THEME,
        this._themeService.theme()
      );
    });

    // Track current language
    effect(() => {
      this._tracker.setCustomDimension(
        CustomDimension.LANGUAGE,
        this._languageService.language()
      );
    });

    // Track app version
    this._tracker.setCustomDimension(
      CustomDimension.VERSION,
      this._versionService.appVersion
    );
  }

  public setIsPwa(isPwa: boolean): void {
    this._tracker.setCustomDimension(
      CustomDimension.PWA,
      isPwa ? 'PWA' : 'Web'
    );
  }

  /**
   * Track a custom event
   * @param category Event category
   * @param action Event action
   * @param name Event name
   */
  public trackEvent(
    category: TrackingEventCategory,
    action: TrackingEventAction,
    name?: TrackingEventName
  ): void {
    this._tracker.trackEvent(category, action, name);
  }

  /**
   * Track the export of a palette
   * @param format Format to export
   * @param option Export method
   */
  public trackPaletteExport(format: ExportFormat, option: ExportOption): void {
    const action =
      option === 'copy'
        ? TrackingEventAction.EXPORT_PALETTE_COPY
        : TrackingEventAction.EXPORT_PALETTE_FILE;

    let name: TrackingEventName | undefined;
    switch (format) {
      case ExportFormat.CSS:
        name = TrackingEventName.EXPORT_PALETTE_CSS;
        break;
      case ExportFormat.SCSS:
        name = TrackingEventName.EXPORT_PALETTE_SCSS;
        break;
      case ExportFormat.LESS:
        name = TrackingEventName.EXPORT_PALETTE_LESS;
        break;
      case ExportFormat.TAILWIND:
        name = TrackingEventName.EXPORT_PALETTE_TAILWIND;
        break;
      default:
        console.warn('Unknown palette export format', format);
        name = TrackingEventName.EXPORT_PALETTE_UNKNOWN;
    }

    this.trackEvent(TrackingEventCategory.EXPORT_PALETTE, action, name);
  }

  /**
   * Track the generation of a palette
   * @param scheme Palette scheme
   */
  public trackPaletteGeneration(scheme: PaletteScheme): void {
    let name: TrackingEventName | undefined;
    switch (scheme) {
      case PaletteScheme.RAINBOW:
        name = TrackingEventName.GENERATE_PALETTE_RAINBOW;
        break;
      case PaletteScheme.SURPRISE:
        name = TrackingEventName.GENERATE_PALETTE_SURPRISE;
        break;
      case PaletteScheme.MONOCHROME:
        name = TrackingEventName.GENERATE_PALETTE_MONOCHROME;
        break;
      case PaletteScheme.ANALOGOUS:
        name = TrackingEventName.GENERATE_PALETTE_ANALOGOUS;
        break;
      case PaletteScheme.COMPLEMENTARY:
        name = TrackingEventName.GENERATE_PALETTE_COMPLEMENTARY;
        break;
      case PaletteScheme.SPLIT_COMPLEMENTARY:
        name = TrackingEventName.GENERATE_PALETTE_SPLIT_COMPLEMENTARY;
        break;
      case PaletteScheme.SQUARE:
        name = TrackingEventName.GENERATE_PALETTE_SQUARE;
        break;
      case PaletteScheme.TETRADIC:
        name = TrackingEventName.GENERATE_PALETTE_TETRADIC;
        break;
      case PaletteScheme.TRIADIC:
        name = TrackingEventName.GENERATE_PALETTE_TRIADIC;
        break;
      default:
        console.warn('Unknown palette generation scheme', scheme);
        name = TrackingEventName.GENERATE_PALETTE_UNKNOWN;
    }

    this.trackEvent(
      TrackingEventCategory.GENERATE_PALETTE,
      TrackingEventAction.GENERATE_PALETTE,
      name
    );
  }
}

export class AnalyticsServiceMock {
  public setIsPwa(_isPwa: boolean): void {}

  public trackEvent(
    _category: TrackingEventCategory,
    _action: TrackingEventAction,
    _name?: TrackingEventName
  ): void {}

  public trackPaletteExport(
    _format: ExportFormat,
    _option: ExportOption
  ): void {}

  public trackPaletteGeneration(_scheme: PaletteScheme): void {}
}
