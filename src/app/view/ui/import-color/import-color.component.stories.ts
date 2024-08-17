import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Meta, applicationConfig } from '@storybook/angular';
import { Tailwind, TailwindGrays, TailwindRainbow } from '../../../shared/constants/tailwind-colors';
import { ListService, ListServiceMock } from '../../../shared/data-access/list.service';
import { PaletteService, PaletteServiceMock } from '../../../shared/data-access/palette.service';
import { Palette } from '../../../shared/model';
import { createStory } from '../../../shared/utils/storybook';
import { ImportColorComponent } from './import-color.component';

const listService = new ListServiceMock();
listService.add(TailwindRainbow);
listService.add(TailwindGrays);
listService.add(Tailwind);

const paletteService = new PaletteServiceMock();
// @ts-expect-error - Types of this mock are not correct
paletteService.loadPaletteFromLocalStorage = (id: string): Palette | undefined => {
  switch (id) {
    case TailwindRainbow.id:
      return TailwindRainbow;
    case TailwindGrays.id:
      return TailwindGrays;
    case Tailwind.id:
      return Tailwind;
    default:
      return undefined;
  }
};

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
          useValue: paletteService
        }
      ]
    })
  ]
};
export default meta;

export const Import = createStory<ImportColorComponent>({});
