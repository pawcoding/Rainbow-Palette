import { Injectable, Signal, effect, inject, signal } from '@angular/core';
import { MatomoTracker } from 'ngx-matomo-client';
import { ExportFormat } from '../constants/export-format';
import { PaletteScheme } from '../constants/palette-scheme';
import { LocalStorageKey } from '../enums/local-storage-keys';
import {
  TrackingEventAction,
  TrackingEventCategory,
  TrackingEventName,
} from '../enums/tracking-event';
import { ExportOption } from '../types/export-option';
import { LanguageService } from './language.service';
import { OfflineService } from './offline.service';
import { ThemeService } from './theme.service';
import { ToastService } from './toast.service';
import { VersionService } from './version.service';

export enum CustomDimension {
  LANGUAGE = 1,
  THEME = 2,
  PWA = 3,
  VERSION = 4,
}

export enum AnalyticsStatus {
  UNSET = 'UNSET',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

type TrackingEvent = {
  category: TrackingEventCategory;
  action: TrackingEventAction;
  name?: TrackingEventName;
  value?: number;
  timestamp: number;
};

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private readonly _tracker = inject(MatomoTracker);
  private readonly _themeService = inject(ThemeService);
  private readonly _languageService = inject(LanguageService);
  private readonly _versionService = inject(VersionService);
  private readonly _offlineService = inject(OfflineService);
  private readonly _toastService = inject(ToastService);

  private readonly _status = signal<AnalyticsStatus>(AnalyticsStatus.UNSET);

  public get status(): Signal<AnalyticsStatus> {
    return this._status.asReadonly();
  }

  constructor() {
    this._setup();

    effect(() => {
      const status = this._status();
      if (status === AnalyticsStatus.UNSET) {
        return;
      }

      const analytics = JSON.stringify({
        status,
        expiry: Date.now() + 1000 * 60 * 60 * 24 * 90,
      });
      localStorage.setItem(LocalStorageKey.ANALYTICS, analytics);

      if (status === AnalyticsStatus.ACCEPTED) {
        this._tracker.setConsentGiven();
        this._processEvents('disabled');
      } else if (status === AnalyticsStatus.DECLINED) {
        this._tracker.forgetConsentGiven();
      }
    });

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

    effect(async () => {
      if (!this._offlineService.isOffline()) {
        this._processEvents('offline');
      }
    });
  }

  private _setup(): void {
    const analytics = localStorage.getItem(LocalStorageKey.ANALYTICS);
    if (analytics) {
      try {
        const parsed = JSON.parse(analytics);
        if (parsed.expiry < Date.now()) {
          localStorage.removeItem(LocalStorageKey.ANALYTICS);
        } else {
          if (parsed.status === AnalyticsStatus.ACCEPTED) {
            this._status.set(AnalyticsStatus.ACCEPTED);
          } else if (parsed.status === AnalyticsStatus.DECLINED) {
            this._status.set(AnalyticsStatus.DECLINED);
          }
        }
      } catch (error) {
        console.error('Failed to parse analytics status', error);
      }
    }

    let userId = localStorage.getItem(LocalStorageKey.USER_ID);
    if (!userId) {
      // Generate random user ID with 16 hex characters
      userId = Array.from({ length: 16 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      localStorage.setItem(LocalStorageKey.USER_ID, userId);
    }
    this._tracker.setUserId(userId);
  }

  private _queueEvent(
    event: Omit<TrackingEvent, 'timestamp'>,
    type: 'disabled' | 'offline'
  ): void {
    const key =
      type === 'disabled'
        ? LocalStorageKey.EVENTS_DISABLED
        : LocalStorageKey.EVENTS_OFFLINE;
    const events = JSON.parse(
      localStorage.getItem(key) || '[]'
    ) as Array<TrackingEvent>;

    events.push({ ...event, timestamp: Date.now() });
    localStorage.setItem(key, JSON.stringify(events));
  }

  private _processEvents(type: 'disabled' | 'offline'): void {
    const key =
      type === 'disabled'
        ? LocalStorageKey.EVENTS_DISABLED
        : LocalStorageKey.EVENTS_OFFLINE;
    const cache = localStorage.getItem(key);
    if (!cache) {
      return;
    }

    const events = JSON.parse(cache) as Array<TrackingEvent>;
    for (const event of events) {
      // Skip events older than 24 hours
      if (event.timestamp < Date.now() - 1000 * 60 * 60 * 24) {
        continue;
      }

      this._tracker.trackEvent(event.category, event.action, event.name);
    }

    if (key === LocalStorageKey.EVENTS_DISABLED) {
      this.trackEvent(
        TrackingEventCategory.EVENTS_DISABLED,
        TrackingEventAction.EVENTS_DISABLED,
        undefined,
        events.length
      );
    } else {
      this.trackEvent(
        TrackingEventCategory.EVENTS_OFFLINE,
        TrackingEventAction.EVENTS_OFFLINE,
        undefined,
        events.length
      );
    }

    localStorage.removeItem(key);
  }

  public setIsPwa(isPwa: boolean): void {
    this._tracker.setCustomDimension(
      CustomDimension.PWA,
      isPwa ? 'PWA' : 'Web'
    );
  }

  public acceptAnalytics(): void {
    this._status.set(AnalyticsStatus.ACCEPTED);
    this._toastService.showToast({
      type: 'info',
      message: 'toast.info.analytics-accepted',
    });
  }

  public declineAnalytics(): void {
    this._status.set(AnalyticsStatus.DECLINED);
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
    name?: TrackingEventName,
    value?: number
  ): void {
    if (this._status() !== AnalyticsStatus.ACCEPTED) {
      this._queueEvent(
        {
          category,
          action,
          name,
          value,
        },
        'disabled'
      );
      return;
    }

    if (this._offlineService.isOffline()) {
      this._queueEvent({ category, action, name, value }, 'offline');
      return;
    }

    this._tracker.trackEvent(category, action, name, value);
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
      case PaletteScheme.TRIADIC:
        name = TrackingEventName.GENERATE_PALETTE_TRIADIC;
        break;
      case PaletteScheme.COMPOUND:
        name = TrackingEventName.GENERATE_PALETTE_COMPOUND;
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
  public readonly status = signal<AnalyticsStatus>(
    AnalyticsStatus.UNSET
  ).asReadonly();

  public setIsPwa(_isPwa: boolean): void {}

  public acceptAnalytics(): void {}

  public declineAnalytics(): void {}

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
