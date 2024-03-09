import { TestBed } from '@angular/core/testing';
import { PaletteScheme } from '../../shared/constants/palette-scheme';
import { LocalStorageKey } from '../../shared/enums/local-storage-keys';
import { HomeService } from './home.service';

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

    expect(localStorage.getItem(LocalStorageKey.LAST_GENERATION_SETTINGS)).toBe(
      JSON.stringify({ hex: '#000000', scheme: PaletteScheme.SURPRISE })
    );

    localStorage.removeItem(LocalStorageKey.LAST_GENERATION_SETTINGS);
  });

  it('should load generation settings', () => {
    localStorage.setItem(
      LocalStorageKey.LAST_GENERATION_SETTINGS,
      JSON.stringify({ hex: '#000000', scheme: PaletteScheme.SURPRISE })
    );

    service.loadGenerationSettings();

    expect(service.hex()).toBe('#000000');
    expect(service.scheme()).toBe(PaletteScheme.SURPRISE);

    localStorage.removeItem(LocalStorageKey.LAST_GENERATION_SETTINGS);
  });
});
