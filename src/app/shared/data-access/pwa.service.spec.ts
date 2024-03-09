import { TestBed } from '@angular/core/testing';
import { SwUpdate } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import {
  TrackingEventAction,
  TrackingEventCategory,
} from '../enums/tracking-event';
import { IS_RUNNING_TEST } from '../utils/is-running-test';
import { SwUpdateMock } from '../utils/sw-update-mock';
import { AnalyticsService, AnalyticsServiceMock } from './analytics.service';
import { DialogService, DialogServiceMock } from './dialog.service';
import { PaletteService, PaletteServiceMock } from './palette.service';
import { PwaService } from './pwa.service';
import { ToastService, ToastServiceMock } from './toast.service';

describe('PwaService', () => {
  let swUpdate: SwUpdateMock;
  let analyticsService: AnalyticsServiceMock;
  let dialogService: DialogServiceMock;
  let toastService: ToastServiceMock;
  let paletteService: PaletteServiceMock;

  let service: PwaService;

  beforeEach(() => {
    swUpdate = new SwUpdateMock();
    analyticsService = new AnalyticsServiceMock();
    dialogService = new DialogServiceMock();
    toastService = new ToastServiceMock();
    paletteService = new PaletteServiceMock();

    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        { provide: IS_RUNNING_TEST, useValue: true },
        { provide: SwUpdate, useValue: swUpdate },
        { provide: AnalyticsService, useValue: analyticsService },
        { provide: DialogService, useValue: dialogService },
        { provide: ToastService, useValue: toastService },
        { provide: PaletteService, useValue: paletteService },
      ],
    });
    service = TestBed.inject(PwaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should listen to installation', () => {
    spyOn(analyticsService, 'trackEvent');

    window.dispatchEvent(new Event('appinstalled'));

    expect(service.isPwa()).toBeTrue();
    expect(analyticsService.trackEvent).toHaveBeenCalled();
  });

  it('should notify about broken state', () => {
    spyOn(dialogService, 'alert');

    swUpdate.unrecoverable.next();

    expect(dialogService.alert).toHaveBeenCalled();
  });

  it('should toast about updates', () => {
    spyOn(toastService, 'showToast');

    swUpdate.emitUpdateAvailable();

    expect(toastService.showToast).toHaveBeenCalled();
  });

  it('should handle failed installation', async () => {
    spyOn(toastService, 'showToast');
    spyOn(analyticsService, 'trackEvent');
    // Suppress console.error
    spyOn(console, 'error');

    await swUpdate.emitInstallationFailed();

    expect(toastService.showToast).toHaveBeenCalled();
    expect(analyticsService.trackEvent).toHaveBeenCalledWith(
      TrackingEventCategory.PWA,
      TrackingEventAction.PWA_UPDATE_FAILED
    );
  });

  it('should handle update rejection', async () => {
    spyOn(dialogService, 'confirm').and.returnValue(Promise.resolve(false));
    spyOn(analyticsService, 'trackEvent');

    await swUpdate.emitUpdateReady();

    expect(analyticsService.trackEvent).toHaveBeenCalledTimes(0);
  });

  it('should update app', async () => {
    spyOn(dialogService, 'confirm').and.callThrough();
    spyOn(paletteService, 'savePaletteToLocalStorage').and.callThrough();
    spyOn(analyticsService, 'trackEvent');

    await swUpdate.emitUpdateReady();

    expect(dialogService.confirm).toHaveBeenCalledTimes(1);
    expect(paletteService.savePaletteToLocalStorage).toHaveBeenCalledTimes(1);
    // @ts-expect-error Function has an optional parameter which does not get detected here
    expect(paletteService.savePaletteToLocalStorage).toHaveBeenCalledWith(true);
    expect(analyticsService.trackEvent).toHaveBeenCalledWith(
      TrackingEventCategory.PWA,
      TrackingEventAction.PWA_UPDATE_COMPLETED
    );
  });
});
