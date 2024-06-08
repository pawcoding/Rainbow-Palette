import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { TailwindGrays } from '../constants/tailwind-colors';
import { LocalStorageKey } from '../enums/local-storage-keys';
import { Palette } from '../model';
import { ListService, PaletteListItem } from './list.service';

const predefined: PaletteListItem = {
  id: 'predefined',
  name: 'Predefined Palette'
};

const predefinedPalette = new Palette(predefined.name, [], predefined.id);

describe('ListService', () => {
  let service: ListService;

  beforeEach(() => {
    localStorage.setItem(LocalStorageKey.PALETTE_IDS, JSON.stringify([predefined]));

    TestBed.configureTestingModule({});
    service = TestBed.inject(ListService);
  });

  it('should be created', async () => {
    expect(service).toBeTruthy();

    const list = await firstValueFrom(service.list$);
    expect(list.length).toBe(1);
    expect(list[0].id).toBe('predefined');
    expect(list[0].name).toBe('Predefined Palette');
  });

  it('should add a palette id to the list', async () => {
    const palette = TailwindGrays;
    service.add(palette);

    const list = await firstValueFrom(service.list$);
    expect(list.length).toBe(2);

    const item = list.find((i) => i.id === palette.id);
    expect(item).toBeTruthy();
  });

  it('should not add a palette id to the list if it already exists', async () => {
    service.add(predefinedPalette);

    const list = await firstValueFrom(service.list$);
    expect(list.length).toBe(1);
  });

  it('should remove a palette id from the list', async () => {
    service.remove('predefined');

    const list = await firstValueFrom(service.list$);
    expect(list).toEqual([]);
  });

  it('should not remove a palette id from the list if it does not exist', async () => {
    service.remove('test-id');

    const list = await firstValueFrom(service.list$);
    expect(list.length).toBe(1);
  });

  afterEach(() => {
    localStorage.removeItem(LocalStorageKey.PALETTE_IDS);
  });
});
