import { TestBed } from '@angular/core/testing';

import { PaletteGuard } from './palette.guard';

describe('PaletteGuard', () => {
  let guard: PaletteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PaletteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
