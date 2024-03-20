import { TestBed } from '@angular/core/testing';
import { PaletteScheme } from '../constants/palette-scheme';
import { LocalStorageKey } from '../enums/local-storage-keys';
import { ColorNameService, ColorNameServiceMock } from './color-name.service';
import { ColorService, ColorServiceMock } from './color.service';
import { PaletteService } from './palette.service';
import { ToastService, ToastServiceMock } from './toast.service';

describe('PaletteService', () => {
  let colorService: ColorServiceMock;
  let colorNameService: ColorNameServiceMock;
  let toastService: ToastServiceMock;
  let service: PaletteService;

  beforeEach(() => {
    colorService = new ColorServiceMock();
    colorNameService = new ColorNameServiceMock();
    toastService = new ToastServiceMock();

    TestBed.configureTestingModule({
      providers: [
        { provide: ColorService, useValue: colorService },
        { provide: ColorNameService, useValue: colorNameService },
        {
          provide: ToastService,
          useValue: toastService
        }
      ]
    });
    service = TestBed.inject(PaletteService);

    spyOn(colorService, 'regenerateShades').and.callThrough();
    spyOn(colorNameService, 'getColorName').and.callThrough();
    spyOn(toastService, 'showToast').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a palette', async () => {
    await service.generatePalette('#ffffff', PaletteScheme.ANALOGOUS);

    expect(service.palette()).toBeTruthy();
    expect(colorService.regenerateShades).toHaveBeenCalledTimes(5);
    expect(colorNameService.getColorName).toHaveBeenCalledTimes(5);
  });

  it('should save palette to local storage', async () => {
    await service.generatePalette('#ffffff', PaletteScheme.COMPLEMENTARY);
    service.savePaletteToLocalStorage();

    expect(localStorage.getItem(LocalStorageKey.PALETTE)).toBeTruthy();
    expect(localStorage.getItem(LocalStorageKey.PALETTE)).toContain('name');
    expect(localStorage.getItem(LocalStorageKey.PALETTE)).toContain('colors');
    expect(colorService.regenerateShades).toHaveBeenCalledTimes(3);
    expect(colorNameService.getColorName).toHaveBeenCalledTimes(3);
  });

  it('should load palette from local storage', () => {
    localStorage.setItem(
      LocalStorageKey.PALETTE,
      JSON.stringify({ name: 'Test', colors: [] })
    );
    service.loadPaletteFromLocalStorage();

    const palette = service.palette();
    expect(palette).toBeTruthy();
    expect(palette!.name).toBe('Test');
  });

  it('should show error toast when loading invalid palette', () => {
    localStorage.setItem(LocalStorageKey.PALETTE, 'invalid');
    service.loadPaletteFromLocalStorage();

    expect(toastService.showToast).toHaveBeenCalled();
  });

  afterEach(() => {
    localStorage.removeItem(LocalStorageKey.PALETTE);
  });
});
