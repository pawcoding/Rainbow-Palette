import { TestBed } from '@angular/core/testing';
import { MatomoTracker } from 'ngx-matomo-client';
import { ExportFormat } from '../constants/export-format';
import { PaletteScheme } from '../constants/palette-scheme';
import { LocalStorageKey } from '../enums/local-storage-keys';
import { TrackingEventAction, TrackingEventCategory, TrackingEventName } from '../enums/tracking-event';
import { MatomoTrackerMock } from '../utils/matomo-tracker-mock';
import { sleep } from '../utils/sleep';
import { AnalyticsService, AnalyticsStatus, CustomDimension } from './analytics.service';
import { LanguageService, LanguageServiceMock } from './language.service';
import { OfflineService, OfflineServiceMock } from './offline.service';
import { ThemeService, ThemeServiceMock } from './theme.service';
import { ToastService, ToastServiceMock } from './toast.service';
import { VersionService, VersionServiceMock } from './version.service';

describe('AnalyticsService', () => {
  let tracker: MatomoTrackerMock;

  let service: AnalyticsService;

  beforeEach(() => {
    tracker = new MatomoTrackerMock();

    localStorage.setItem(
      LocalStorageKey.ANALYTICS,
      JSON.stringify({
        status: AnalyticsStatus.ACCEPTED,
        expiry: Date.now() + 100000
      })
    );

    TestBed.configureTestingModule({
      providers: [
        { provide: MatomoTracker, useValue: tracker },
        { provide: ThemeService, useClass: ThemeServiceMock },
        { provide: LanguageService, useClass: LanguageServiceMock },
        { provide: VersionService, useClass: VersionServiceMock },
        { provide: ToastService, useClass: ToastServiceMock },
        { provide: OfflineService, useClass: OfflineServiceMock }
      ]
    });
    service = TestBed.inject(AnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should track events', () => {
    spyOn(tracker, 'trackEvent');

    service.trackEvent(TrackingEventCategory.TEST, TrackingEventAction.TEST, TrackingEventName.TEST, 1);

    expect(tracker.trackEvent).toHaveBeenCalledWith(
      TrackingEventCategory.TEST,
      TrackingEventAction.TEST,
      TrackingEventName.TEST,
      1
    );
  });

  it('should track palette export', () => {
    spyOn(tracker, 'trackEvent');

    service.trackPaletteExport(ExportFormat.CSS, 'copy');

    expect(tracker.trackEvent).toHaveBeenCalledWith(
      TrackingEventCategory.EXPORT_PALETTE,
      TrackingEventAction.EXPORT_PALETTE_COPY,
      TrackingEventName.EXPORT_PALETTE_CSS,
      undefined
    );
  });

  it('should track palette generation', () => {
    spyOn(tracker, 'trackEvent');

    service.trackPaletteGeneration(PaletteScheme.RAINBOW);

    expect(tracker.trackEvent).toHaveBeenCalledWith(
      TrackingEventCategory.GENERATE_PALETTE,
      TrackingEventAction.GENERATE_PALETTE,
      TrackingEventName.GENERATE_PALETTE_RAINBOW,
      undefined
    );
  });

  afterEach(() => {
    localStorage.removeItem(LocalStorageKey.ANALYTICS);
    localStorage.removeItem(LocalStorageKey.USER_ID);
  });
});

describe('AnalyticsService', () => {
  let tracker: MatomoTrackerMock;
  let versionService: VersionServiceMock;

  beforeEach(() => {
    tracker = new MatomoTrackerMock();
    versionService = new VersionServiceMock();

    TestBed.configureTestingModule({
      providers: [
        { provide: MatomoTracker, useValue: tracker },
        { provide: ThemeService, useClass: ThemeServiceMock },
        { provide: LanguageService, useClass: LanguageServiceMock },
        { provide: VersionService, useValue: versionService }
      ]
    });

    spyOn(tracker, 'enableHeartBeatTimer');
    spyOn(tracker, 'setCustomDimension');
    spyOn(tracker, 'trackEvent');

    TestBed.inject(AnalyticsService);
  });

  it('should setup tracker on creation', async () => {
    expect(tracker.enableHeartBeatTimer).toHaveBeenCalled();
    expect(tracker.setCustomDimension).toHaveBeenCalledWith(CustomDimension.VERSION, versionService.appVersion);

    await sleep(5);
    expect(tracker.setCustomDimension).toHaveBeenCalledTimes(3);
  });

  afterEach(() => {
    localStorage.removeItem(LocalStorageKey.ANALYTICS);
    localStorage.removeItem(LocalStorageKey.USER_ID);
  });
});
