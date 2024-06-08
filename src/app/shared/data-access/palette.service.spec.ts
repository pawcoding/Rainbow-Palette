import { TestBed } from '@angular/core/testing';
import { PaletteScheme } from '../constants/palette-scheme';
import { TailwindGrays } from '../constants/tailwind-colors';
import { LocalStorageKey } from '../enums/local-storage-keys';
import { Palette } from '../model';
import { ColorNameService, ColorNameServiceMock } from './color-name.service';
import { ColorService, ColorServiceMock } from './color.service';
import { ListService, ListServiceMock } from './list.service';
import { PaletteService } from './palette.service';
import { ToastService, ToastServiceMock } from './toast.service';

describe('PaletteService', () => {
  let colorService: ColorServiceMock;
  let colorNameService: ColorNameServiceMock;
  let toastService: ToastServiceMock;
  let listService: ListServiceMock;
  let service: PaletteService;

  beforeEach(() => {
    colorService = new ColorServiceMock();
    colorNameService = new ColorNameServiceMock();
    toastService = new ToastServiceMock();
    listService = new ListServiceMock();

    TestBed.configureTestingModule({
      providers: [
        { provide: ColorService, useValue: colorService },
        { provide: ColorNameService, useValue: colorNameService },
        {
          provide: ToastService,
          useValue: toastService
        },
        {
          provide: ListService,
          useValue: listService
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

    const palette = service.palette();
    expect(palette).toBeTruthy();

    expect(localStorage.getItem(`${LocalStorageKey.PALETTE}_${palette!.id}`)).toBeTruthy();
    expect(localStorage.getItem(`${LocalStorageKey.PALETTE}_${palette!.id}`)).toContain('id');
    expect(localStorage.getItem(`${LocalStorageKey.PALETTE}_${palette!.id}`)).toContain('name');
    expect(localStorage.getItem(`${LocalStorageKey.PALETTE}_${palette!.id}`)).toContain('colors');
    expect(colorService.regenerateShades).toHaveBeenCalledTimes(3);
    expect(colorNameService.getColorName).toHaveBeenCalledTimes(3);

    localStorage.removeItem(`${LocalStorageKey.PALETTE}_${palette!.id}`);
  });

  it('should load palette from local storage', () => {
    localStorage.setItem(`${LocalStorageKey.PALETTE}_test`, JSON.stringify({ name: 'Test', id: 'test', colors: [] }));
    service.loadPaletteFromLocalStorage('test');

    const palette = service.palette();
    expect(palette).toBeTruthy();
    expect(palette!.name).toBe('Test');
    expect(palette!.id).toBe('test');
  });

  it('should show error toast when loading invalid palette', () => {
    localStorage.setItem(`${LocalStorageKey.PALETTE}_test`, 'invalid');
    service.loadPaletteFromLocalStorage('test');

    expect(toastService.showToast).toHaveBeenCalled();
  });

  afterEach(() => {
    localStorage.removeItem(`${LocalStorageKey.PALETTE}_test`);
  });
});

describe('PaletteService', () => {
  let listService: ListServiceMock;

  it('should automatically migrate existing palette', () => {
    listService = new ListServiceMock();
    spyOn(listService, 'add').and.callThrough();

    // Add existing palette to local storage
    const palette = new Palette('Test', [...TailwindGrays.colors], 'test-id');
    localStorage.setItem(LocalStorageKey.PALETTE, palette.toString());

    TestBed.configureTestingModule({
      providers: [
        { provide: ListService, useValue: listService },
        { provide: ColorService, useClass: ColorServiceMock },
        { provide: ColorNameService, useClass: ColorNameServiceMock },
        { provide: ToastService, useClass: ToastServiceMock }
      ]
    });

    // Create palette service
    TestBed.inject(PaletteService);

    // Check if palette was migrated
    expect(localStorage.getItem(`${LocalStorageKey.PALETTE}_${palette.id}`)).toBeTruthy();
    expect(listService.add).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem(LocalStorageKey.PALETTE)).toBeFalsy();

    // Clean up
    localStorage.removeItem(`${LocalStorageKey.PALETTE}_${palette.id}`);
  });
});
