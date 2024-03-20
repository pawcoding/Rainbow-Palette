import { Dialog } from '@angular/cdk/dialog';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Color, Palette, Shade } from '../../shared/model';
import { DialogMock } from '../../shared/utils/dialog-mock';
import { ExportModalService } from './export-modal.service';

describe('ExportModalService', () => {
  let dialog: DialogMock<undefined>;
  let service: ExportModalService;

  beforeEach(() => {
    dialog = new DialogMock(undefined);

    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [{ provide: Dialog, useValue: dialog }]
    });
    service = TestBed.inject(ExportModalService);

    spyOn(dialog, 'open').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open export modal', async () => {
    const palette = new Palette('TestPalette', [new Color([Shade.random()], 'TestColor')]);
    await service.openExportModal(palette);

    expect(dialog.open).toHaveBeenCalledTimes(1);
  });
});
