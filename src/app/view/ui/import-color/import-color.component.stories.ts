import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Meta, applicationConfig } from '@storybook/angular';
import { Tailwind, TailwindGrays, TailwindRainbow } from '../../../shared/constants/tailwind-colors';
import { ListService, ListServiceMock } from '../../../shared/data-access/list.service';
import { PaletteService } from '../../../shared/data-access/palette.service';
import { PaletteServiceMock } from '../../../shared/data-access/palette.service-mock';
import { createStory } from '../../../shared/utils/storybook';
import { ImportColorComponent } from './import-color.component';

const listService = new ListServiceMock();
listService.remove('test-id');
listService.add(TailwindRainbow);
listService.add(TailwindGrays);
listService.add(Tailwind);

const meta: Meta<ImportColorComponent> = {
  title: 'View/Import Color',
  component: ImportColorComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        {
          provide: DIALOG_DATA,
          useValue: { paletteId: 'test' }
        },
        {
          provide: DialogRef,
          useValue: {}
        },
        {
          provide: ListService,
          useValue: listService
        },
        {
          provide: PaletteService,
          useClass: PaletteServiceMock
        }
      ]
    })
  ]
};
export default meta;

export const Import = createStory<ImportColorComponent>({});
