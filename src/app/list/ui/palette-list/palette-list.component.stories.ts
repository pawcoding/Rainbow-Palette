import { ActivatedRoute } from '@angular/router';
import { Meta, moduleMetadata } from '@storybook/angular';
import { createStory } from '../../../shared/utils/storybook';
import { PaletteListComponent } from './palette-list.component';

const meta: Meta<PaletteListComponent> = {
  title: 'List/Palette List',
  component: PaletteListComponent,
  decorators: [
    moduleMetadata({
      providers: [{ provide: ActivatedRoute, useValue: {} }]
    })
  ],
  tags: ['autodocs'],
  argTypes: {
    list: {
      type: {
        name: 'array',
        required: true,
        value: {
          name: 'object',
          value: {
            id: {
              name: 'string',
              required: true
            },
            name: {
              name: 'string',
              required: true
            }
          }
        }
      }
    }
  }
};
export default meta;

export const List = createStory<PaletteListComponent>({
  args: {
    list: [
      {
        id: 'palette1',
        name: 'Rainbow'
      },
      {
        id: 'palette2',
        name: 'Sunset'
      },
      {
        id: 'palette3',
        name: 'Ocean'
      },
      {
        id: 'palette4',
        name: 'Forest'
      }
    ]
  }
});
