import { TestBed } from '@angular/core/testing';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should prompt', async () => {
    spyOn(window, 'prompt').and.returnValue('Test');

    const result = await service.prompt('message', 'default');

    expect(result).toBe('Test');
    expect(window.prompt).toHaveBeenCalledWith('message', 'default');
  });

  it('should confirm', async () => {
    spyOn(window, 'confirm').and.returnValue(true);

    const result = await service.confirm('message');

    expect(result).toBeTrue();
    expect(window.confirm).toHaveBeenCalledWith('message');
  });
});
