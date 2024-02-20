import { VERSION } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import packageJson from '../../../../package.json';
import { VersionService } from './version.service';

describe('VersionService', () => {
  let service: VersionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VersionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have angular version', () => {
    expect(service.angularVersion).toBeTruthy();
    expect(service.angularVersion).toBe(VERSION.full);
  });

  it('should have app version', () => {
    expect(service.appVersion).toBeTruthy();
    expect(service.appVersion).toBe(packageJson.version);
  });

  it('should log versions', () => {
    const consoleSpy = spyOn(console, 'info');
    service = new VersionService();
    expect(consoleSpy).toHaveBeenCalledTimes(2);
  });
});
