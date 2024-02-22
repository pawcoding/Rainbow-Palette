import { TestBed } from '@angular/core/testing';
import { PaletteScheme } from '../constants/palette-scheme';
import { Toast } from '../interfaces/toast.interface';
import { Color } from '../model/color.model';
import { ColorService } from './color.service';
import { PaletteService } from './palette.service';
import { ToastService } from './toast.service';

describe('PaletteService', () => {
  let service: PaletteService;

  const toastService = {
    showToast(_toast: Toast) {},
  };
  const colorService = {
    regenerateShades(_color: Color) {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ToastService,
          useValue: toastService,
        },
        { provide: ColorService, useValue: colorService },
      ],
    });
    service = TestBed.inject(PaletteService);

    spyOn(toastService, 'showToast');
    spyOn(colorService, 'regenerateShades');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a palette', () => {
    service.generatePalette('#ffffff', PaletteScheme.ANALOGOUS);

    expect(service.palette()).toBeTruthy();
    expect(colorService.regenerateShades).toHaveBeenCalledTimes(3);
  });

  it('should save palette to local storage', () => {
    service.generatePalette('#ffffff', PaletteScheme.COMPLEMENTARY);
    service.savePaletteToLocalStorage();

    expect(localStorage.getItem('palette')).toBeTruthy();
    expect(localStorage.getItem('palette')).toContain('name');
    expect(localStorage.getItem('palette')).toContain('colors');
    expect(colorService.regenerateShades).toHaveBeenCalledTimes(2);
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

  it('should show error toast when loading invalid palette', () => {
    localStorage.setItem('palette', 'invalid');
    service.loadPaletteFromLocalStorage();

    expect(toastService.showToast).toHaveBeenCalled();
  });

  afterEach(() => {
    localStorage.removeItem('palette');
  });
});
