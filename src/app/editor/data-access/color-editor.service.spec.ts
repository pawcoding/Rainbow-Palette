import { Dialog } from '@angular/cdk/dialog';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Color, Shade } from '../../shared/model';
import { DialogMock } from '../../shared/utils/dialog-mock';
import { ColorEditorService } from './color-editor.service';

describe('ColorEditorService', () => {
  let dialog: DialogMock<Color>;
  let color: Color;
  let service: ColorEditorService;

  beforeEach(() => {
    color = new Color([Shade.random()], 'Test');
    dialog = new DialogMock(color);

    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [{ provide: Dialog, useValue: dialog }]
    });
    service = TestBed.inject(ColorEditorService);

    spyOn(dialog, 'open').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open color editor', async () => {
    const newColor = await service.openColorEditor(color);

    expect(dialog.open).toHaveBeenCalledTimes(1);
    expect(newColor).toBeDefined();
    expect(newColor?.toString()).toBe(color.toString());
  });
});
