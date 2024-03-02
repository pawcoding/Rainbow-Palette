import { Dialog } from '@angular/cdk/dialog';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Color } from '../model/color.model';
import { Palette } from '../model/palette.model';
import { Shade } from '../model/shade.model';
import { DialogMock } from '../utils/dialog-mock';
import { ExportService } from './export.service';

describe('ExportService', () => {
  let dialog: DialogMock<undefined>;
  let service: ExportService;

  beforeEach(() => {
    dialog = new DialogMock(undefined);

    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [{ provide: Dialog, useValue: dialog }],
    });
    service = TestBed.inject(ExportService);

    spyOn(dialog, 'open').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open export modal', async () => {
    const palette = new Palette('TestPalette', [
      new Color([Shade.random()], 'TestColor'),
    ]);
    await service.openExportModal(palette);

    expect(dialog.open).toHaveBeenCalledTimes(1);
  });
});
