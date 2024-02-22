import { TestBed } from '@angular/core/testing';
import { PaletteScheme } from '../constants/palette-scheme';
import { PaletteService } from './palette.service';

describe('PaletteService', () => {
  let service: PaletteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaletteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a palette', () => {
    service.generatePalette('#ffffff', PaletteScheme.RAINBOW);
    expect(service.palette()).toBeTruthy();
  });

  it('should save palette to local storage', () => {
    service.generatePalette('#ffffff', PaletteScheme.RAINBOW);
    service.savePaletteToLocalStorage();
    expect(localStorage.getItem('palette')).toBeTruthy();
    expect(localStorage.getItem('palette')).toContain('name');
    expect(localStorage.getItem('palette')).toContain('colors');
  });

  it('should load palette from local storage', () => {
    localStorage.setItem(
      'palette',
      JSON.stringify({ name: 'Test', colors: [] })
    );
    service.loadPaletteFromLocalStorage();

    const palette = service.palette();
    expect(palette).toBeTruthy();
    expect(palette!.name).toBe('Test');
  });

  afterEach(() => {
    localStorage.removeItem('palette');
  });
});
