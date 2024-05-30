import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { LocalStorageKey } from '../enums/local-storage-keys';
import { ListService } from './list.service';

describe('ListService', () => {
  let service: ListService;

  beforeEach(() => {
    localStorage.setItem(LocalStorageKey.PALETTE_IDS, '["predefined"]');

    TestBed.configureTestingModule({});
    service = TestBed.inject(ListService);
  });

  it('should be created', async () => {
    expect(service).toBeTruthy();

    const list = await firstValueFrom(service.list$);
    expect(list).toContain('predefined');
  });

  it('should add a palette id to the list', async () => {
    service.add('test-id');

    const list = await firstValueFrom(service.list$);
    expect(list).toContain('test-id');
  });

  it('should not add a palette id to the list if it already exists', async () => {
    service.add('predefined');

    const list = await firstValueFrom(service.list$);
    expect(list).toEqual(['predefined']);
  });

  it('should remove a palette id from the list', async () => {
    service.remove('predefined');

    const list = await firstValueFrom(service.list$);
    expect(list).toEqual([]);
  });

  it('should not remove a palette id from the list if it does not exist', async () => {
    service.remove('test-id');

    const list = await firstValueFrom(service.list$);
    expect(list).toEqual(['predefined']);
  });

  afterEach(() => {
    localStorage.removeItem(LocalStorageKey.PALETTE_IDS);
  });
});
