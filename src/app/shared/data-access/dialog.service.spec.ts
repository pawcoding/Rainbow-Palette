import { Dialog } from '@angular/cdk/dialog';
import { TestBed } from '@angular/core/testing';
import { DialogMock } from '../utils/dialog-mock';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
  it('should prompt', async () => {
    // Setup dialog for prompt test
    const dialog = new DialogMock(undefined);

    TestBed.configureTestingModule({
      providers: [{ provide: Dialog, useValue: dialog }]
    });
    const service = TestBed.inject(DialogService);

    // Test
    spyOn(dialog, 'open').and.callThrough();
    spyOn(window, 'prompt').and.returnValue('Test');

    const result = await service.prompt('message', 'default');

    expect(result).toBe('Test');
    expect(window.prompt).toHaveBeenCalledWith('message', 'default');
  });

  it('should confirm', async () => {
    // Setup dialog for confirm test
    const dialog = new DialogMock(undefined);

    TestBed.configureTestingModule({
      providers: [{ provide: Dialog, useValue: dialog }]
    });
    const service = TestBed.inject(DialogService);

    // Test
    spyOn(dialog, 'open').and.callThrough();
    spyOn(window, 'confirm').and.returnValue(true);

    const result = await service.confirm('message');

    expect(result).toBeTrue();
    expect(window.confirm).toHaveBeenCalledWith('message');
  });

  it('should alert', async () => {
    // Setup dialog for alert test
    const dialog = new DialogMock<void>(undefined);

    TestBed.configureTestingModule({
      providers: [{ provide: Dialog, useValue: dialog }]
    });
    const service = TestBed.inject(DialogService);

    // Test
    spyOn(dialog, 'open').and.callThrough();

    const result = await service.alert({
      title: 'title',
      message: 'message'
    });

    expect(dialog.open).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
  });
});
