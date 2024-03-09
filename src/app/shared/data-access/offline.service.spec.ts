import { TestBed } from '@angular/core/testing';

import { OfflineService } from './offline.service';

describe('OfflineService', () => {
  let service: OfflineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfflineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
