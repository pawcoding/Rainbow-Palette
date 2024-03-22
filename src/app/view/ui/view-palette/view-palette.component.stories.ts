import { Meta } from '@storybook/angular';
import { TailwindGrays, TailwindRainbow } from '../../../shared/constants/tailwind-colors';
import { createStory } from '../../../shared/utils/storybook';
import { ViewPaletteComponent } from './view-palette.component';

const meta: Meta<ViewPaletteComponent> = {
  title: 'View/Palette',
  component: ViewPaletteComponent,
  tags: ['autodocs'],
  argTypes: {
    palette: {
      type: {
        name: 'object',
        value: {
          name: {
            name: 'string',
            required: true
          }
        },
        required: true
      }
    },
    renameColor: {
      table: {
        disable: true
      }
    },
    editColor: {
      table: {
        disable: true
      }
    },
    removeColor: {
      table: {
        disable: true
      }
    },
    copyShade: {
      table: {
        disable: true
      }
    }
  }
};
export default meta;

export const Rainbow = createStory<ViewPaletteComponent>({
  args: {
    palette: TailwindRainbow
  }
});
export const Gray = createStory<ViewPaletteComponent>({
  args: {
    palette: TailwindGrays
  }
});
