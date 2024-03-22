import { Meta } from '@storybook/angular';
import { PaletteScheme } from '../../../shared/constants/palette-scheme';
import { createStory } from '../../../shared/utils/storybook';
import { HomeGeneratorComponent } from './home-generator.component';

const meta: Meta<HomeGeneratorComponent> = {
  title: 'Home/Generator',
  component: HomeGeneratorComponent,
  tags: ['autodocs'],
  argTypes: {
    scheme: {
      control: {
        type: 'select'
      },
      type: {
        name: 'enum',
        value: Object.values(PaletteScheme)
      }
    },
    generate: {
      table: {
        disable: true
      }
    }
  }
};
export default meta;

export const Generator = createStory<HomeGeneratorComponent>({
  args: {
    hex: '#3B82F6',
    scheme: PaletteScheme.RAINBOW
  }
});
