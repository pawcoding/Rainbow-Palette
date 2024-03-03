import { VERSION } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import packageJson from '../../../../package.json';
import { VersionService } from './version.service';

describe('VersionService', () => {
  let service: VersionService;

  beforeEach(() => {
    spyOn(console, 'info');

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
});

describe('VersionService', () => {
  it('should log versions', () => {
    spyOn(console, 'info');

    TestBed.configureTestingModule({});
    const service = TestBed.inject(VersionService);

    expect(console.info).toHaveBeenCalledTimes(2);
  });
});
