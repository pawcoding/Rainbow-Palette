import { TestBed } from '@angular/core/testing';
import { PaletteScheme } from '../constants/palette-scheme';
import { ColorNameService, ColorNameServiceMock } from './color-name.service';
import { ColorService, ColorServiceMock } from './color.service';
import { PaletteService } from './palette.service';
import { ToastService, ToastServiceMock } from './toast.service';

describe('PaletteService', () => {
  let toastService: ToastServiceMock;
  let colorService: ColorServiceMock;
  let service: PaletteService;

  beforeEach(() => {
    toastService = new ToastServiceMock();
    colorService = new ColorServiceMock();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ToastService,
          useValue: toastService,
        },
        { provide: ColorService, useValue: colorService },
        { provide: ColorNameService, useValue: new ColorNameServiceMock() },
      ],
    });
    service = TestBed.inject(PaletteService);

    spyOn(toastService, 'showToast').and.callThrough();
    spyOn(colorService, 'regenerateShades').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate a palette', async () => {
    await service.generatePalette('#ffffff', PaletteScheme.ANALOGOUS);

    expect(service.palette()).toBeTruthy();
    expect(colorService.regenerateShades).toHaveBeenCalledTimes(3);
  });

  it('should save palette to local storage', async () => {
    await service.generatePalette('#ffffff', PaletteScheme.COMPLEMENTARY);
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
