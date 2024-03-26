import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { ToastTimeouts } from '../interfaces/toast.interface';
import { OverlayMock } from '../utils/overlay-mock';
import { sleep } from '../utils/sleep';
import { MobileService, MobileServiceMock } from './mobile.service';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Overlay, useClass: OverlayMock },
        { provide: MobileService, useClass: MobileServiceMock }
      ]
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.toastStack()).toBeDefined();
    expect(service.toastStack().length).toBe(0);
  });

  it('should open and close a toast', () => {
    const toast = { message: 'Test' };
    const id = service.showToast(toast);
    expect(service.toastStack()).toContain(toast);

    service.hideToast(id);
    expect(service.toastStack()).not.toContain(toast);
  });

  it(
    'should close toast automatically after the timeout',
    async () => {
      service.showToast({ message: 'Test', type: 'test' });
      expect(service.toastStack().length).toBe(1);
      await sleep(ToastTimeouts.test + 10);
      expect(service.toastStack().length).toBe(0);
    },
    ToastTimeouts.test + 20
  );
});
