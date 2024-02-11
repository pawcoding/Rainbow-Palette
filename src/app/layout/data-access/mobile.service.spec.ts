import { TestBed } from '@angular/core/testing';
import { sleep } from '../../shared/utils/sleep';
import { MobileService } from './mobile.service';

describe('MobileService', () => {
  let service: MobileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set isMobile depending on window width', () => {
    const isMobile = service.isMobile();
    expect(isMobile).toBe(window.innerWidth < 640);
  });

  it('should change isMobile on window resize', async () => {
    window.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));
    await sleep(10);
    expect(service.isMobile()).toBe(true);

    window.innerWidth = 1000;
    window.dispatchEvent(new Event('resize'));
    await sleep(10);
    expect(service.isMobile()).toBe(false);
  });
});
