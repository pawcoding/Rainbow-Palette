import { Dialog } from '@angular/cdk/dialog';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Color } from '../model/color.model';
import { Shade } from '../model/shade.model';
import { DialogMock } from '../utils/dialog-mock';
import { ColorEditorService } from './color-editor.service';

describe('ColorEditorService', () => {
  let color: Color;
  let service: ColorEditorService;

  beforeEach(() => {
    color = new Color([Shade.random()], 'Test');

    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [{ provide: Dialog, useValue: new DialogMock(color) }],
    });
    service = TestBed.inject(ColorEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open color editor', async () => {
    const newColor = await service.openColorEditor(color);

    expect(newColor).toBeDefined();
    expect(newColor?.toString()).toBe(color.toString());
  });
});
