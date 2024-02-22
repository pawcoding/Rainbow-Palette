import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';
import { PaletteScheme } from '../../shared/constants/palette-scheme';

describe('HomeService', () => {
  let service: HomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save generation settings', () => {
    service.hex.set('#000000');
    service.scheme.set(PaletteScheme.SURPRISE);

    service.saveGenerationSettings();

    expect(localStorage.getItem('lastGeneration')).toBe(
      JSON.stringify({ hex: '#000000', scheme: PaletteScheme.SURPRISE })
    );

    localStorage.removeItem('lastGeneration');
  });

  it('should load generation settings', () => {
    localStorage.setItem(
      'lastGeneration',
      JSON.stringify({ hex: '#000000', scheme: PaletteScheme.SURPRISE })
    );

    service.loadGenerationSettings();

    expect(service.hex()).toBe('#000000');
    expect(service.scheme()).toBe(PaletteScheme.SURPRISE);

    localStorage.removeItem('lastGeneration');
  });
});
