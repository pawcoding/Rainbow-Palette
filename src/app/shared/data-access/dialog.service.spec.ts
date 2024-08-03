import { Dialog } from '@angular/cdk/dialog';
import { TestBed } from '@angular/core/testing';
import { DialogMock } from '../utils/dialog-mock';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
  it('should prompt', async () => {
    // Setup dialog for prompt test
    const dialog = new DialogMock('Test');

    TestBed.configureTestingModule({
      providers: [{ provide: Dialog, useValue: dialog }]
    });
    const service = TestBed.inject(DialogService);

    // Test
    spyOn(dialog, 'open').and.callThrough();

    const result = await service.prompt({
      title: 'title',
      message: 'message',
      confirmLabel: 'confirm',
      initialValue: 'initial'
    });

    expect(dialog.open).toHaveBeenCalledTimes(1);
    expect(result).toBe('Test');
  });

  it('should confirm', async () => {
    // Setup dialog for confirm test
    const dialog = new DialogMock(true);

    TestBed.configureTestingModule({
      providers: [{ provide: Dialog, useValue: dialog }]
    });
    const service = TestBed.inject(DialogService);

    // Test
    spyOn(dialog, 'open').and.callThrough();

    const result = await service.confirm({
      title: 'title',
      message: 'message',
      confirmLabel: 'confirm'
    });

    expect(dialog.open).toHaveBeenCalledTimes(1);
    expect(result).toBeTrue();
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
