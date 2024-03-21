import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Meta, applicationConfig } from '@storybook/angular';
import { sky } from '../shared/constants/tailwind-colors';
import { ColorService, ColorServiceMock } from '../shared/data-access/color.service';
import { Color } from '../shared/model';
import { createStory } from '../shared/utils/storybook';
import { EditorComponent } from './editor.component';

const meta: Meta<EditorComponent> = {
  title: 'Editor/Editor',
  component: EditorComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        { provide: DIALOG_DATA, useValue: { color: sky, shadeIndex: 500 } },
        {
          provide: DialogRef,
          useValue: {
            close: (_: Color | undefined): void => {}
          }
        },
        { provide: ColorService, useClass: ColorServiceMock }
      ]
    })
  ]
};
export default meta;

export const Editor = createStory<EditorComponent>({});
