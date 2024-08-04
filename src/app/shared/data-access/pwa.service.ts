import { Injectable, effect, inject, signal } from '@angular/core';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageKey } from '../enums/local-storage-keys';
import { TrackingEventAction, TrackingEventCategory } from '../enums/tracking-event';
import { IS_RUNNING_TEST } from '../utils/is-running-test';
import { AnalyticsService } from './analytics.service';
import { DialogService } from './dialog.service';
import { PaletteService } from './palette.service';
import { ToastService } from './toast.service';
import { VersionService } from './version.service';

interface AppData {
  version: string;
}

declare const window: Window & {
  navigator: Navigator & {
    standalone: boolean;
  };
};

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private readonly _SwUpdate = inject(SwUpdate);
  private readonly _isRunningTest = inject(IS_RUNNING_TEST);
  private readonly _translateService = inject(TranslateService);
  private readonly _analyticsService = inject(AnalyticsService);
  private readonly _toastService = inject(ToastService);
  private readonly _dialogService = inject(DialogService);
  private readonly _paletteService = inject(PaletteService);
  private readonly _versionService = inject(VersionService);

  private readonly _isPwa = signal(false);
  private readonly _doingUpdate = signal(false);

  public readonly isPwa = this._isPwa.asReadonly();
  public readonly doingUpdate = this._doingUpdate.asReadonly();

  public constructor() {
    effect(() => {
      this._analyticsService.setIsPwa(this._isPwa());
    });

    // Check if the app is currently running as a PWA
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      this._isPwa.set(true);
    }

    // Listen for the app being installed as a PWA
    window.addEventListener('appinstalled', () => {
      this._isPwa.set(true);
      this._analyticsService.trackEvent(TrackingEventCategory.PWA, TrackingEventAction.PWA_INSTALL);
    });

    // Listen for updates to the service worker
    this._SwUpdate.versionUpdates.subscribe(async (event) => {
      await this._handleUpdateEvents(event);
    });

    // Listen for broken service worker
    this._SwUpdate.unrecoverable.subscribe(() => {
      this._dialogService.alert(this._translateService.instant('pwa.broken'));
    });

    // Check if the app is currently updating
    if (localStorage.getItem(LocalStorageKey.UPGRADING)) {
      localStorage.removeItem(LocalStorageKey.UPGRADING);
      this._toastService.showToast({
        type: 'info',
        message: 'pwa.update-success',
        parameters: { version: this._versionService.appVersion }
      });
    }
  }

  private async _handleUpdateEvents(event: VersionEvent): Promise<void> {
    // Latest version is already installed
    if (event.type === 'NO_NEW_VERSION_DETECTED') {
      return;
    }

    // New version available
    if (event.type === 'VERSION_DETECTED') {
      this._toastService.showToast({
        type: 'info',
        message: 'pwa.update-available',
        parameters: {
          version: (event.version.appData as AppData | undefined)?.version
        }
      });
      return;
    }

    // Update installation failed
    if (event.type === 'VERSION_INSTALLATION_FAILED') {
      console.error('PWA update failed', event.error);
      this._analyticsService.trackEvent(TrackingEventCategory.PWA, TrackingEventAction.PWA_UPDATE_FAILED);
      this._toastService.showToast({
        type: 'error',
        message: 'pwa.update-failed',
        parameters: {
          version: (event.version.appData as AppData | undefined)?.version
        }
      });
      return;
    }

    // Update was downloaded and can be installed through restart
    const restart = await this._dialogService.confirm(
      this._translateService.instant('pwa.restart', {
        old: (event.currentVersion.appData as AppData | undefined)?.version ?? this._versionService.appVersion,
        new: (event.latestVersion.appData as AppData | undefined)?.version
      })
    );

    // Continue without updating
    if (!restart) {
      return;
    }

    // Save the current palette to local storage
    this._paletteService.savePaletteToLocalStorage(true);

    // Set the flag to indicate that the app is currently updating
    localStorage.setItem(LocalStorageKey.UPGRADING, 'true');
    this._doingUpdate.set(true);

    // Track the update
    this._analyticsService.trackEvent(TrackingEventCategory.PWA, TrackingEventAction.PWA_UPDATE_COMPLETED);

    // Reload the app to apply the update
    if (!this._isRunningTest) {
      document.location.reload();
    }
  }
}

export class PwaServiceMock {
  public readonly isPwa = signal(false).asReadonly();
  public readonly doingUpdate = signal(false).asReadonly();
}
