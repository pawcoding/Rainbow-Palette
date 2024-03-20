import { TestBed } from '@angular/core/testing';
import { ToastTimeouts } from '../interfaces/toast.interface';
import { sleep } from '../utils/sleep';
import { MobileService, MobileServiceMock } from './mobile.service';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: MobileService, useClass: MobileServiceMock }]
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open and close a toast', () => {
    service.showToast({ message: 'Test' });
    expect(service.toast()).toEqual({ message: 'Test' });

    service.hideToast();
    expect(service.toast()).toBeUndefined();
  });

  it(
    'should close automatically toast after the timeout',
    async () => {
      service.showToast({ message: 'Test', type: 'test' });
      expect(service.toast()).toBeDefined();
      await sleep(ToastTimeouts.test + 10);
      expect(service.toast()).toBeUndefined();
    },
    ToastTimeouts.test + 20
  );

  it(
    'should show only one toast at a time',
    async () => {
      service.showToast({ message: 'Test', type: 'test' });
      expect(service.toast()).toBeDefined();
      await sleep(ToastTimeouts.test / 2);
      service.showToast({ message: 'Test2', type: 'test' });
      expect(service.toast()).toEqual({ message: 'Test2', type: 'test' });
      await sleep(ToastTimeouts.test / 2);
      expect(service.toast()).toBeDefined();
      await sleep(ToastTimeouts.test / 2 + 10);
      expect(service.toast()).toBeUndefined();
    },
    1.5 * ToastTimeouts.test + 20
  );
});
